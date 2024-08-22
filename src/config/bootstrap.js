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

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

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


};
