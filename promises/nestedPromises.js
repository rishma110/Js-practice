// Generate data center level aggregated stats of protected vs. unprotected applications
 
// BLACKBOX START

// The following mock helper method returns protection stats for a given application type in a given data center.
// In real implementation this will be an ajax call to `${datacenterUrl}/${applicationType}` or something like that
const getApplicationProtectionStats = (datacenterUrl, applicationType)=> new Promise((resolve) => { 
    setTimeout(() => {
      resolve({
        protectedApps: Math.floor(Math.random() * 100),
        unprotectedApps: Math.floor(Math.random() * 100)
      });
    }, 1000);
  });
  
  // BLACKBOX END
   
  const applicationTypes = [
    'VMware',
    'MSSQL',
    'AHV'
  ];
   
  const datacenters = [
    {name: 'San Francisco', url: 'https://www.rubrik.com/sanfrancisco/stats'},
    {name: 'Bangalore', url: 'https://www.rubrik.com/bangalore/stats'},
    {name: 'Amsterdam', url: 'https://www.rubrik.com/amsterdam/stats'}
  ];
  
  const aggregatedData = (resolve, reject) =>{
  
    let stats = {}; let arr = []
    for(let i=0; i<datacenters.length; i++){
      stats[datacenters[i].name]={protectedApps:0, unprotectedApps:0};
      for(let j=0; j<applicationTypes.length; j++){
         arr.push(getApplicationProtectionStats(datacenters[i].url, applicationTypes[j]).then(obj=> {
           return {name: datacenters[i].name, protectedApps: obj.protectedApps, unprotectedApps:obj.unprotectedApps}
        }))
      }
    }
    let p =  Promise.all(arr).then(obj => {
    obj.forEach(val => {
        stats[val.name].protectedApps = stats[val.name].protectedApps + val.protectedApps;
        stats[val.name].unprotectedApps = stats[val.name].unprotectedApps + val.unprotectedApps;
    })
      resolve(stats);
  })
    return p;
  }
  
  let actualStats = new Promise(aggregatedData).then(val=> {
    console.log(val)
  })
  
 //solution should look like this 
//   {
//     'Amsterdam': {
//         protectedApps: 160,
//         unprotectedApps: 47
//     },
//     'Bangalore': {
//         protectedApps: 112,
//         unprotectedApps: 78
//     },
//     'San Francisco': 
//         protectedApps: 178,
//         unprotectedApps: 153
//     }
//   }