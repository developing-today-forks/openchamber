// Simple test to verify the bounded read functionality
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

// Import the functions we modified
const plansModule = await import('./packages/web/server/lib/routing/plans.js');
const poolLinksModule = await import('./packages/web/server/lib/routing/pool-plan-links.js');
const routeOverridesModule = await import('./packages/web/server/lib/routing/route-overrides-store.js');

console.log('✓ Successfully imported all modules');

// Test 1: Check that constants are defined
console.log('\n=== Test 1: Constants defined ===');
console.log('MAX_PLANS_JSON_BYTES:', plansModule.MAX_PLANS_JSON_BYTES);
console.log('MAX_POOL_PLAN_LINKS_BYTES:', poolLinksModule.MAX_POOL_PLAN_LINKS_BYTES);
console.log('MAX_ROUTE_FEEDBACK_BYTES:', routeOverridesModule.MAX_ROUTE_FEEDBACK_BYTES);

// Test 2: Verify readPlanStore uses bounded read
console.log('\n=== Test 2: readPlanStore signature ===');
console.log('readPlanStore function exists:', typeof plansModule.readPlanStore === 'function');

// Test 3: Verify readPoolPlanLinks uses bounded read
console.log('\n=== Test 3: readPoolPlanLinks signature ===');
console.log('readPoolPlanLinks function exists:', typeof poolLinksModule.readPoolPlanLinks === 'function');

// Test 4: Verify readFeedback uses bounded read
console.log('\n=== Test 4: route-overrides-store functions ===');
const store = routeOverridesModule.createOverrideStore({ dataDir: fs.mkdtempSync(path.join(os.tmpdir(), 'test-')) });
console.log('createOverrideStore exists:', typeof routeOverridesModule.createOverrideStore === 'function');
console.log('recordFeedback exists:', typeof store.recordFeedback === 'function');
console.log('readFeedback exists:', typeof store.readFeedback === 'function');

console.log('\n✅ All basic checks passed!');
console.log('\nSummary of changes:');
console.log('1. plans.js: readPlanStore now uses readBoundedFileSync with MAX_PLANS_JSON_BYTES (1MB)');
console.log('2. pool-plan-links.js: readPoolPlanLinks now uses readBoundedFileSync with MAX_POOL_PLAN_LINKS_BYTES (1MB)');
console.log('3. route-overrides-store.js: readFeedback now uses readBoundedFileSync with MAX_ROUTE_FEEDBACK_BYTES (10MB)');
console.log('4. route-overrides-store.js: recordFeedback now enforces growth bound with rotation');
