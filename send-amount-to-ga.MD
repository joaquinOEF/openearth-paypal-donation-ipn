## Send donation amount to Google Analytics

The PayPal button has a callback function for completed donations, it's called `onComplete` and provides the amount donated along with some other related info on its first param, we are going to use that to send an event to GA.

Here is an example donation button with its `onComplete` callback already in place, you likely need to grab that function and place it in your existing button, don't forget to update the `eventCategory`, `eventAction` and `eventLabel` fields.

The amount donated is being rounded to the nearest integer, GA would ignore the event if we provide a decimal number as its value


```js
PayPal.Donation.Button({
  env: 'production',
  hosted_button_id: 'XXXXXXXX',
  image: {
    src:'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
    alt:'Donate with PayPal button',
    title:'PayPal - The safer, easier way to pay online!',
  },
  onComplete: function(info) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Donations',
      eventAction: 'donation_received',
      eventLabel: 'Donation Received',
      value: Math.round(info.amt),
    });
  },
}).render('#donate-button');
```
