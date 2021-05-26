const Sequelize = require('sequelize');

const { 
  STRING,
  INTEGER,
  DECIMAL
} = Sequelize;

const db = new Sequelize('dealers_choice_sequalize', 'postgres', 'FSA123', {
  host: 'localhost',
  post: '5432',
  dialect: 'postgres',
  logging: false,
//  autocommit: true
})

const Department = db.define('department', {
  deptId: { 
    type: INTEGER, 
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: STRING, allowNull: false, unique: true },
  url: { type: STRING }
});

const Item = db.define('item', {
  sku: {
    type: STRING,
    primaryKey: true,
  },
  name: { type: STRING, allowNull: false, unique: false },
  url: { type: STRING, allowNull: true, unique: false },
  qtyonhand: { type: INTEGER, allowNull: false, unique: false },
  price: { type: DECIMAL(8,2), allowNull: false, unique: false },
  leadtime: { type: INTEGER, allowNull: false, unique: false },
});

Item.belongsTo(Department);
Department.hasMany(Item);
Department.belongsTo(Department, { as: 'parent' })

async function seedData () {
  const data = {
    departments: [ 
      { name: 'Sporting Goods', url: 'https://g.foolcdn.com/editorial/images/543108/sports-equipment-sporting-goods-balls-getty.jpg' },
      { name: 'Outdoor', url: 'https://www.dailyherald.com/storyimage/DA/20200503/ENTLIFE/200509997/AR/0/AR-200509997.jpg&updated=202004281510&MaxW=900&maxH=900&noborder&Q=80' },
      { name: 'Clothing', url: 'https://previews.123rf.com/images/jackf/jackf1805/jackf180506915/101617628-portrait-of-happy-family-of-four-with-shopping-bags-in-clothing-shop.jpg' }
    ],
    subdepts: [
      { name: 'Baseball', parentDeptId: 1, url: 'https://images.theconversation.com/files/338414/original/file-20200528-51509-1fm69mw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop' },
      { name: 'Football', parentDeptId: 1, url: 'https://static01.nyt.com/images/2020/08/02/sports/02collegefootball-web-2/merlin_162985113_bb1f697e-55d7-4324-8afb-7361ce90afcb-mobileMasterAt3x.jpg' },
      { name: 'Running', parentDeptId: 1, url: 'https://i.insider.com/5b0601b71ae6621c008b4aa2?width=1136&format=jpeg' },
      { name: 'Patio', parentDeptId: 2, url: 'https://spy.com/wp-content/uploads/2020/06/outdoor-patio-sets-featured.jpg' },
      { name: 'Garden', parentDeptId: 2, url: 'https://cdn.britannica.com/42/91642-050-332E5C66/Keukenhof-Gardens-Lisse-Netherlands.jpg' },
      { name: 'Women', parentDeptId: 3, url: 'https://static.independent.co.uk/2021/02/18/15/tall%20clothing%20brands.jpg?width=982&height=726&auto=webp&quality=75' },
      { name: 'Men', parentDeptId: 3, url: 'https://cdn.luxe.digital/media/2019/12/16162209/best-men-online-shopping-jcrew-luxe-digital.jpg' },
      { name: 'Children', parentDeptId: 3, url: 'https://review.chinabrands.com/chinabrands/seo/image/20181013/20181013032537688950-1.jpg' }
    ],
    items: [
      { sku: '12345A', name: 'Glove', qtyonhand: 25, price: 12.99, leadtime: 12, departmentDeptId: 4 },
      { sku: '12345B', name: 'Baseball', qtyonhand: 125, price: 2.99, leadtime: 1, departmentDeptId: 4 },
      { sku: '12345C', name: 'Hat', qtyonhand: 55, price: 22.99, leadtime: 0, departmentDeptId: 4 },
      { sku: '12345D', name: 'Helmet', qtyonhand: 25, price: 12.99, leadtime: 12, departmentDeptId: 5 },
      { sku: '12345E', name: 'Shoes', qtyonhand: 125, price: 2.99, leadtime: 1, departmentDeptId: 5 },
      { sku: '12345F', name: 'Football', qtyonhand: 55, price: 22.99, leadtime: 0, departmentDeptId: 5 },
      { sku: '12345G', name: 'Top', qtyonhand: 25, price: 42.99, leadtime: 0, departmentDeptId: 6 },
      { sku: '12345H', name: 'Shorts', qtyonhand: 15, price: 21.99, leadtime: 0, departmentDeptId: 6 },
      { sku: '12345I', name: 'GPS Watch', qtyonhand: 0, price: 222.99, leadtime: 10, departmentDeptId: 6 },
      { sku: '12345J', name: 'Lounge chair', qtyonhand: 10, price: 222.99, leadtime: 10, departmentDeptId: 7 },
      { sku: '12345K', name: 'Recliner', qtyonhand: 0, price: 222.99, leadtime: 10, departmentDeptId: 7 },
      { sku: '12345L', name: 'Table', qtyonhand: 20, price: 222.99, leadtime: 10, departmentDeptId: 7 },
      { sku: '12345M', name: 'Plant', qtyonhand: 0, price: 222.99, leadtime: 10, departmentDeptId: 8 },
      { sku: '12345N', name: 'Flower', qtyonhand: 50, price: 222.99, leadtime: 10, departmentDeptId: 8 },
      { sku: '12345O', name: 'Dress', qtyonhand: 0, price: 222.99, leadtime: 10, departmentDeptId: 9 },
      { sku: '12345P', name: 'Blouse', qtyonhand: 22, price: 222.99, leadtime: 10, departmentDeptId: 9 },
      { sku: '12345Q', name: 'Jeans', qtyonhand: 5, price: 222.99, leadtime: 10, departmentDeptId: 10 },
      { sku: '12345R', name: 'Socks', qtyonhand: 0, price: 2.99, leadtime: 10, departmentDeptId: 10 },
      { sku: '12345S', name: 'Shirt', qtyonhand: 34, price: 22.99, leadtime: 10, departmentDeptId: 11 },
      { sku: '12345T', name: 'Jeans', qtyonhand: 0, price: 12.99, leadtime: 10, departmentDeptId: 11 },
    ]
  };

  await Promise.all([
    data.departments.map(c => Department.create(c)),
    data.subdepts.map(c => Department.create(c)),
    data.items.map(c => Item.create(c))
  ]);
}

const createAndSeed = async () => {
  await db.sync({ force: true });
  await seedData();
}

module.exports = {
  createAndSeed,
  Department,
  Item
}
