module.exports = {
  name: 'Internet Storm Center',
  acronym: 'ISC',
  description: 'View SANS Internet Storm Center IP information',
  entityTypes: ['IPv4'],
  styles: ['./styles/styles.less'],
  onDemandOnly: true,
  defaultColor: 'light-gray',
  request: {
    cert: '',
    key: '',
    passphrase: '',
    ca: '',
    proxy: ''
  },
  logging: {
    level: 'info'
  },
  options: [
    {
      key: 'ignoreZeroCount',
      name: 'Only View IPs with Blocked Packets',
      description:
        'If enabled, the integration will only return information on IP addresses that have a blocked packet count greater than zero',
      default: false,
      type: 'boolean',
      userCanEdit: false,
      adminOnly: true
    }
  ]
};
