import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var salaries = this.store.findAll('salary');

    if (salaries.get('length') === 0) {
      this.store.createRecord('salary', {
        per: 'year',
        amount: 0,
      });
      salaries = this.store.findAll('salary');
      console.log('injected empty salary');
    }


    return salaries;
  }
});
