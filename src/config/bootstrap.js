/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  if (await Company.count() > 0) {
    return;
  }

  if (await Board.count() > 0) {
    return;
  }

  if (await User.count() > 0) {
    return;
  }

  await Company.create({ name: 'Meta' });
  await Company.create({ name: 'SuperViz' });
  await Company.create({ name: 'Amazon' });

  await Board.create({
    name: 'Marketing',
    companyId: 1
  });
  await Board.create({
    name: 'Ops',
    companyId: 1
  });
  await Board.create({
    name: 'Development',
    companyId: 1
  });
  await Board.create({
    name: 'Sales',
    companyId: 1
  });
  await Board.create({
    name: 'Marketing',
    companyId: 2
  });
  await Board.create({
    name: 'Ops',
    companyId: 2
  });
  await Board.create({
    name: 'Development',
    companyId: 2
  });
  await Board.create({
    name: 'Sales',
    companyId: 2
  });
  await Board.create({
    name: 'Marketing',
    companyId: 3
  });
  await Board.create({
    name: 'Ops',
    companyId: 3
  });
  await Board.create({
    name: 'Development',
    companyId: 3
  });
  await Board.create({
    name: 'Sales',
    companyId: 3
  });


  // superviz
  await User.create({
    email: 'miguel@teste.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 2,
    firstName: 'Miguel',
    lastName: 'Claret',
    usertype: 'admin',
  });

  await User.create({
    email: 'superviz@adm.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 2,
    firstName: 'Vitor',
    lastName: 'Norton',
    usertype: 'admin',
  });

  await User.create({
    email: 'thaly@teste.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 2,
    firstName: 'Thalyta',
    lastName: 'Viana',
    usertype: 'employee',
  });
  await User.create({
    email: 'otavio@teste.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 2,
    firstName: 'Otavio',
    lastName: 'Vasconcelos',
    usertype: 'employee',
  });


// amazon
  await User.create({
    email: 'jeff@amazon.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 3,
    firstName: 'Jeff',
    lastName: 'da Silva',
    usertype: 'admin',
  });

  await User.create({
    email: 'thaly@amazon.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 3,
    firstName: 'Thalyta',
    lastName: 'Viana',
    usertype: 'employee',
  });
  await User.create({
    email: 'otavio@amazon.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 3,
    firstName: 'Otavio',
    lastName: 'Vasconcelos',
    usertype: 'employee',

  });
// meta
  await User.create({
    email: 'mark@meta.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 1,
    firstName: 'Mark',
    lastName: 'Zuck',
    usertype: 'admin',
  });

  await User.create({
    email: 'thaly@meta.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 1,
    firstName: 'Thalyta',
    lastName: 'Viana',
    usertype: 'employee',
  });
  await User.create({
    email: 'otavio@meta.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 1,
    firstName: 'Otavio',
    lastName: 'Vasconcelos',
    usertype: 'employee',
  });
};
