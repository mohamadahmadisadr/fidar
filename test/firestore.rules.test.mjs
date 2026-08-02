/**
 * Security-rules test suite for firestore.rules.
 *
 * Run from the project root (requires Java 17+; firebase-tools is pinned
 * because newer versions require Java 21+):
 *
 *   npx --yes firebase-tools@13.35.1 emulators:exec --only firestore \
 *     --project fidar-rules-test "node test/firestore.rules.test.mjs"
 *
 * One-off dev dependency:
 *   npm i -D @firebase/rules-unit-testing
 *
 * Everything runs against the local emulator. It never touches production.
 * PERMISSION_DENIED lines in the output are the denials being asserted.
 */
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, deleteDoc, updateDoc, collection, getDocs, addDoc, query, orderBy, limit } from 'firebase/firestore';
import fs from 'fs';

const env = await initializeTestEnvironment({
  projectId: 'fidar-rules-test',
  firestore: { rules: fs.readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8'), host: '127.0.0.1', port: 8080 },
});

// Seed data bypassing rules.
await env.withSecurityRulesDisabled(async (ctx) => {
  const db = ctx.firestore();
  await setDoc(doc(db, 'site_config/general'), { adminEmails: ['boss@fidarbs.at'], topBar: {} });
  await setDoc(doc(db, 'products/p1'), { titleEn: 'P' });
  await setDoc(doc(db, 'categories/c1'), { en: 'Cat', items: [{ en: 'i' }] });
  await setDoc(doc(db, 'services/s1'), { titleEn: 'S' });
  await setDoc(doc(db, 'consultations/x1'), { name: 'A', email: 'a@b.c', service: 'q', status: 'pending', createdAt: 'now' });
  await setDoc(doc(db, 'analytics/stats'), { totalVisits: 1, todayVisits: 1, monthVisits: 1, lastVisitedDate: 'd', lastVisitedMonth: 'm', visitsByLang: { en: 1, de: 0 } });
});

const anon      = env.unauthenticatedContext().firestore();
const cfgAdmin  = env.authenticatedContext('u1', { email: 'boss@fidarbs.at', email_verified: true }).firestore();
const bootAdmin = env.authenticatedContext('u2', { email: 'devfa75@gmail.com', email_verified: true }).firestore();
const attacker  = env.authenticatedContext('u3', { email: 'evil@evil.com', email_verified: true }).firestore();
const unverif   = env.authenticatedContext('u4', { email: 'boss@fidarbs.at', email_verified: false }).firestore();

let pass = 0, fail = 0;
const t = async (name, p) => {
  try { await p; console.log(`  PASS  ${name}`); pass++; }
  catch (e) { console.log(`  FAIL  ${name}`); fail++; }
};

console.log('\n[public site must keep working, signed out]');
await t('anon reads site_config (list)', assertSucceeds(getDocs(query(collection(anon,'site_config'), limit(5)))));
await t('anon reads products',           assertSucceeds(getDocs(collection(anon,'products'))));
await t('anon reads categories',         assertSucceeds(getDocs(collection(anon,'categories'))));
await t('anon reads services',           assertSucceeds(getDocs(collection(anon,'services'))));
await t('anon submits contact form',     assertSucceeds(addDoc(collection(anon,'consultations'), { name:'N', email:'e@x.c', service:'s', status:'pending', createdAt:'now', message:'hi' })));
await t('anon writes analytics counter', assertSucceeds(setDoc(doc(anon,'analytics/stats'), { totalVisits:2, todayVisits:2, monthVisits:2, lastVisitedDate:'d', lastVisitedMonth:'m', visitsByLang:{en:2,de:0} }, { merge:true })));

console.log('\n[the reported holes must be closed]');
await t('anon CANNOT read customer inquiries', assertFails(getDocs(query(collection(anon,'consultations'), orderBy('createdAt','desc'), limit(50)))));
await t('anon CANNOT read one inquiry',        assertFails(getDoc(doc(anon,'consultations/x1'))));
await t('anon CANNOT write site_config',       assertFails(setDoc(doc(anon,'site_config/general'), { adminEmails:['evil@evil.com'] })));
await t('anon CANNOT add self to allowlist',   assertFails(updateDoc(doc(anon,'site_config/general'), { adminEmails:['evil@evil.com'] })));
await t('anon CANNOT write products',          assertFails(setDoc(doc(anon,'products/p2'), { titleEn:'hacked' })));
await t('anon CANNOT delete products',         assertFails(deleteDoc(doc(anon,'products/p1'))));
await t('anon CANNOT edit category items',     assertFails(updateDoc(doc(anon,'categories/c1'), { items:[] })));
await t('anon CANNOT delete inquiries',        assertFails(deleteDoc(doc(anon,'consultations/x1'))));

console.log('\n[signed-in but not on the allowlist]');
await t('attacker CANNOT read inquiries',    assertFails(getDocs(collection(attacker,'consultations'))));
await t('attacker CANNOT write products',    assertFails(setDoc(doc(attacker,'products/p3'), { titleEn:'x' })));
await t('attacker CANNOT edit allowlist',    assertFails(updateDoc(doc(attacker,'site_config/general'), { adminEmails:['evil@evil.com'] })));
await t('unverified email CANNOT write',     assertFails(setDoc(doc(unverif,'products/p4'), { titleEn:'x' })));

console.log('\n[admins must retain full control]');
await t('config admin reads inquiries',      assertSucceeds(getDocs(query(collection(cfgAdmin,'consultations'), orderBy('createdAt','desc'), limit(50)))));
await t('config admin writes products',      assertSucceeds(setDoc(doc(cfgAdmin,'products/p5'), { titleEn:'ok' })));
await t('config admin edits category items', assertSucceeds(updateDoc(doc(cfgAdmin,'categories/c1'), { items:[{ en:'edited' }] })));
await t('config admin updates site_config',  assertSucceeds(setDoc(doc(cfgAdmin,'site_config/general'), { adminEmails:['boss@fidarbs.at'], topBar:{} })));
await t('config admin deletes inquiry',      assertSucceeds(deleteDoc(doc(cfgAdmin,'consultations/x1'))));
await t('bootstrap admin works (lockout safety)', assertSucceeds(setDoc(doc(bootAdmin,'products/p6'), { titleEn:'ok' })));

console.log('\n[misc]');
await t('anon CANNOT read unknown collection', assertFails(getDocs(collection(anon,'secrets'))));
await t('malformed inquiry rejected (bad status)', assertFails(addDoc(collection(anon,'consultations'), { name:'N', email:'e@x.c', service:'s', status:'completed', createdAt:'now' })));
await t('malformed inquiry rejected (missing email)', assertFails(addDoc(collection(anon,'consultations'), { name:'N', service:'s', status:'pending', createdAt:'now' })));

console.log(`\n${fail === 0 ? 'ALL' : ''} ${pass} passed, ${fail} failed`);
await env.cleanup();
process.exit(fail === 0 ? 0 : 1);
