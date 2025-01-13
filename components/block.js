polarity.export = PolarityComponent.extend({
  ip: Ember.computed.alias('block.data.details.ip'),
  timezone: Ember.computed('Intl', function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  })
});
