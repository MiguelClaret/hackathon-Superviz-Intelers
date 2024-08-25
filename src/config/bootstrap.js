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

  await Company.create({ name: 'Company One' });
  await Company.create({ name: 'Company Two' });
  await Company.create({ name: 'Company Three' });

  await Board.create({
    name: 'Board one',
    companyId: 1
  });
  await Board.create({
    name: 'Board two',
    companyId: 1
  });
  await Board.create({
    name: 'Board three',
    companyId: 1
  });


  await User.create({
    email: 'miguel@teste.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 1,
    firstName: 'Miguel',
    lastName: 'Claret',
    usertype: 'admin',
  })

  await User.create({
    email: 'thaly@teste.com',
    password: await sails.helpers.hashPassword('123'),
    companyId: 1,
    firstName: 'Thalyta',
    lastName: 'Viana',
    usertype: 'employee',
  })

};
