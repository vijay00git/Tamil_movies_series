#!/usr/bin/env node

/**
 * URL TESTER - Test your Replit public URL
 * Run this to verify your add-on is working
 */

const https = require('https');

console.log('🌐 REPLIT URL TESTER');
console.log('═'.repeat(50));

// Ask for URL
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your Replit public URL (without /manifest.json): ', (baseUrl) => {
  if (!baseUrl || !baseUrl.includes('replit')) {
    console.log('❌ Please enter a valid Replit URL like: https://your-project.replit.dev');
    rl.close();
    return;
  }

  const manifestUrl = baseUrl + '/manifest.json';
  const catalogUrl = baseUrl + '/catalog/movie/tamil_movies.json';

  console.log(`\n🔍 Testing URLs:`);
  console.log(`   Manifest: ${manifestUrl}`);
  console.log(`   Catalog:  ${catalogUrl}`);

  // Test manifest
  testUrl('Manifest', manifestUrl).then(() => {
    // Test catalog
    return testUrl('Catalog', catalogUrl);
  }).then(() => {
    console.log('\n✅ SUCCESS! Your add-on is working!');
    console.log(`📱 Use this URL in Stremio:`);
    console.log(`   ${manifestUrl}`);
    console.log('\n🎬 Ready to add to Stremio!');
  }).catch((error) => {
    console.log(`\n❌ FAILED: ${error.message}`);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure your Replit project is running (green play button)');
    console.log('   2. Check the Console tab in Replit for errors');
    console.log('   3. Try refreshing your Replit page');
    console.log('   4. Make sure you\'re using the public URL from the top of the page');
  }).finally(() => {
    rl.close();
  });
});

function testUrl(name, url) {
  return new Promise((resolve, reject) => {
    console.log(`\n⏳ Testing ${name}...`);

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✅ ${name} OK - Status: ${res.statusCode}`);
          if (json.name) {
            console.log(`   Add-on: ${json.name}`);
          }
          if (json.metas) {
            console.log(`   Items: ${json.metas.length}`);
          }
          resolve();
        } catch (e) {
          reject(new Error(`${name} returned invalid JSON`));
        }
      });
    }).on('error', (err) => {
      reject(new Error(`${name} connection failed: ${err.message}`));
    });
  });
}
