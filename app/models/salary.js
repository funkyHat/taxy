import DS from "ember-data";
import Ember from 'ember';

var component = DS.Model.extend({

});

export default DS.Model.extend({
  amount: DS.attr('number'),
  per: DS.attr('string'),

  yearly: Ember.computed('amount', 'per', function() {
    //updated on the fly when the inputs are changed
    var per = this.get('per');
    var multiplier;
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

  afterTax: Ember.computed('yearly', 'per', function() {
    var yearly = this.get('yearly');
    return (yearly * 0.8).toFixed(2);
  }),
});
