import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('salary', 'Unit | Model | salary', {
  // Specify the other units that are required for this test.
  needs: []
});

test('multipliers', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
  Ember.run(function(){
    model.set('amount', 5000);
    model.set('per', 'year');

    assert.equal(model.get('yearly'), 5000);

    model.set('per', 'month');

    assert.equal(model.get('yearly'), 60000);

    model.set('per', 'week');
    model.set('amount', 100);

    assert.equal(model.get('yearly'), 5200);
  });
});

test('allowance', function(assert) {
  let model = this.subject();
  let cases = [
    [1, 10600],
    [50000, 10600],
    [100000, 10600],
    [100002, 10599],
    [121200, 0],
  ];
  Ember.run(function(){
    model.set('per', 'year');
    cases.forEach(function(c) {
      model.set('amount', c[0]);
      assert.equal(model.get('allowance'), c[1],
          'Salary: '+c[0]+', Allowance: '+c[1]);
    });
  });
});
