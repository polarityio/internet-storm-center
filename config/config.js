module.exports = {
  name: 'Internet Storm Center',
  acronym: 'ISC',
  description: 'Search SANS Internet Storm Center IP information',
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
  options: []
};
