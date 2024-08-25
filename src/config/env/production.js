module.exports = {
  port: 1337,
  datastores: {
    default: {
      adapter: 'sails-postgresql',
      url: 'postgresql://admin:lFwXucqSNxgCB5VuX9VSeR1UweFAowBx@dpg-cr1ucrrqf0us739j3it0-a.oregon-postgres.render.com/dbsuperviz',
    },
  },
  sockets: {
    onlyAllowOrigins: [
      "https://hackathon-superviz-intelers.onrender.com",
    ],
  },
  session: {
    cookie: {
      secure: true,
    }
  },
  http: {
    trustProxy: true,
  }
};