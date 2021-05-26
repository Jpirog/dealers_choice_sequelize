const {
  Department,
  Item
} = require('./db')

const dispHeader = (ttl, list) => {
  return `
  <html><head><link rel="stylesheet" href="/styles.css"></head>
  <body><h1>Dealer's Choice - Sequelize</h1>
  <h2><a href='/'>My Department Store</a></h2>
  <h3>${ttl}</h3>
  <div><${list}>
  `
}

const dispEnd = (list) => {
  return `</div></${list}>
   </body></html>`;
}

const dispDepartments = async () => {
  const data = await Department.findAll( { where: { parentDeptId: null }});
  const depts = data.map(c => `
  <li><a href='/departments/${c.dataValues.deptId}-${c.dataValues.name}'>${c.dataValues.name}</a>
  <img src='${c.url}' >
  </li>
  `);
  return dispHeader('Visit Our Departments', 'ul') + depts + dispEnd('ul');
}

const dispDeptSubs = async (id, parent) => {
  const data = await Department.findAll( { where: { parentDeptId: id}});
  const depts = data.map(c => `
  <li><a href='/departments/${id}-${parent}/items/${c.dataValues.deptId}-${c.dataValues.name}'>${c.dataValues.name}</a>
  <img src='${c.url}' >
  </li>
  `);
  return dispHeader(`Items in ${parent}`, 'ul') + depts + dispEnd('ul');
}

const dispDeptSubItems = async (id, parent, mySub) => {
  const data = await Item.findAll( { where: { departmentDeptId: id}});
  const depts = data.map(c => `
  <li>Item: ${c.dataValues.name} <br> Price: ${c.dataValues.price} 
  <br> On hand: ${c.qtyonhand} ${!c.qtyonhand ? ' - Stock arriving in ' + `${c.leadtime}` + ' days' : ''}
  <br>SKU #: ${c.dataValues.sku}
  </li>
  `);
  return dispHeader(`Items in ${parent} --> ${mySub}`, 'ol') + depts + dispEnd('ol');
}

module.exports = {
  dispDepartments,
  dispDeptSubs,
  dispDeptSubItems
}