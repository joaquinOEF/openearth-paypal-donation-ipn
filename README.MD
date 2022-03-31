## Add donor to Mailchimp audience

This repository is ready to be deployed with Vercel and exposes a serverless function meant to be hit by PayPal's Instant Payment Notifications (IPN).

The following variables need to be set on Vercel for all this to work:

|Variable name|Description|
|-------------|-----------|
|`PAYPAL_VALIDATION_URL`|For sandbox: `https://ipnpb.sandbox.paypal.com/cgi-bin/webscr` For production: `https://ipnpb.paypal.com/cgi-bin/webscr`|
|`MAILCHIMP_API_KEY`|Found in _Account > Extras > API keys_|
|`MAILCHIMP_SERVER`|E.g. `us12`, found in your dashboard url or at the end of your API key|
|`LIST_ID`|Found in _All contacts > Settings > Audience names and defaults > Audience ID_|
|`FIRST_NAME_FIELD`|Found in _All contacts > Settings > Audience fields and \*\|MERGE\|\* tags_, for default it's `FNAME`|
|`LAST_NAME_FIELD`|Found in _All contacts > Settings > Audience fields and \*\|MERGE\|\* tags_, for default it's `LNAME`|
|`COUNTRY_FIELD`|Found in _All contacts > Settings > Audience fields and \*\|MERGE\|\* tags_, doesn't exist for default, can be left blank if not needed|

Once deployed, for PayPal to start making IPN calls you need to point them to this deployment, to do that login to your PayPal dashboard and go to _Account Settings > Notifications > Instant payment notifications_, then set the Vercel domain + `/api` as the "Notification URL" E.g: `https://this-is-a-test.vercel.app/api`