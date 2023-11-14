import { Remedy } from './modal'

export const remedies: Remedy[] = [
  {
    id: 1,
    title: 'GOING TO THE SAUNA',
    duration: '15+',
    calendar: '3 days',
    info: 'Research shows that the heat from the sauna stimulates vasodilation — an opening of your blood vessels, which can improve oxygenation and reduce nasal inflammation. This helps make it easy to cough up the phlegm that might be causing congestion. To ease sinus infections, maintain a 10–15 minute sauna session routine for continuously 3 days. Once you have finished your sauna session, give yourself time to cool down before showering. Also, be sure to drink more fluids to replenish any possible losses from sweating and keep those',
    img: require('../../assets/images/sauna.png')
  },
  {
    id: 2,
    title: 'RINSE NASAL PASSAGES',
    duration: '5',
    calendar: '2 weeks',
    info: 'Research shows that the heat from the sauna stimulates vasodilation — an opening of your blood vessels, which can improve oxygenation and reduce nasal inflammation. This helps make it easy to cough up the phlegm that might be causing congestion.To ease sinus infections, maintain a 10–15 minute sauna session routine for continuously 3 days. Once you have finished your sauna session, give yourself time to cool down before showering. Also, be sure to drink more fluids to replenish any possible losses from sweating and keep those',
    img: require('../../assets/images/rinse.png')
  }
  // ...other remedies
]
