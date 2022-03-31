import fetch from 'node-fetch'
import mailchimp from '@mailchimp/mailchimp_marketing'

const {
  MAILCHIMP_API_KEY,
  MAILCHIMP_SERVER,
  LIST_ID,
  PAYPAL_VALIDATION_URL,
  FIRST_NAME_FIELD,
  LAST_NAME_FIELD,
  COUNTRY_FIELD
} = process.env

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER,
})

export default async function handler(req, res) {
  try {
    const {
      payer_email,
      first_name,
      last_name,
      residence_country,
    } = req.body

    if (!payer_email) {
      console.log("Couldn't find donor mail on the IPN payload, skipping")
      return res.status(200).send()
    }

    const urlParams = new URLSearchParams(req.body)
    const paypalResp = await fetch(PAYPAL_VALIDATION_URL, {
      method: 'post',
      headers: {
        'Connection': 'close'
      },
      body: 'cmd=_notify-validate&' + urlParams.toString(),
    })
    const paypalRespBody = await paypalResp.text()

    if (paypalResp.status !== 200 || paypalRespBody.substring(0, 8) !== 'VERIFIED') {
      console.log('Could not verify IPN was sent by Paypal, skipping')
      return res.status(200).send()
    }

    await mailchimp.lists.setListMember(
      LIST_ID,
      payer_email,
      {
        email_address: payer_email,
        status: "subscribed",
        status_if_new: "subscribed",
        merge_fields: {
          [FIRST_NAME_FIELD || 'FNAME']: first_name,
          [LAST_NAME_FIELD || 'LNAME']: last_name,
          [COUNTRY_FIELD || 'COUNTRY']: residence_country
        }
      }
    );
    
    res.status(200).send()
  } catch (err) {
    console.log('Unexpected error')
    console.log(err)
  }
};