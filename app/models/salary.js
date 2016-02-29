import DS from "ember-data";
import Ember from 'ember';

var component = DS.Model.extend({

});

export default DS.Model.extend({
  amount: DS.attr('number'),
  per: DS.attr('string'),

  yearly: Ember.computed('amount', 'per', function() {
    //updated on the fly when the inputs are changed
    let per = this.get('per');
    let multiplier;
    switch (per) {
      case 'year':
        multiplier = 1;
        break;
      case 'month':
        multiplier = 12;
        break;
      case 'week':
        multiplier = 52;
        break;
      default:
        throw "not a valid period: " + per;
    }
    return this.get('amount') * multiplier;
  }),

  allowance: Ember.computed('yearly', function() {
    let basic = 10600;
    return parseInt(Math.max(0,
          basic-Math.max(0, (this.get('yearly')-100000)/2)
          ));
  }),

  NI: Ember.computed('yearly', function() {
    let threshold = 8060;
    let upperLimit = 42385;
    let yearly = this.get('yearly');
    let above, below;
    if (yearly <= threshold) {
      return 0;
    } else {
      if (yearly > upperLimit) {
        above = 0.02 * (yearly - upperLimit);
        below = 0.12 * (upperLimit - threshold);
      } else {
        above = 0;
        below = 0.12 * (yearly - threshold);
      }
      return above + below;
    }
  }),

  afterTax: Ember.computed('yearly', function() {
    let yearly = this.get('yearly');
    return (yearly * 0.8).toFixed(2);
  }),
});
