module.exports = (app)=> {

  app.get("/api/slides", function(req, res){
    const db = req.app.locals.slides;
    db.list(function(err, objects){
      if (err) res.status(500).send(err);

      const sorted_objects = objects.sort((e1,e2) => (e1.id-e2.id));

      res.send({data: sorted_objects});
    })
  });

  app.get("/api/categories", function(req, res){
    const db = req.app.locals.categories;
    db.list(function(err, objects){
      if (err) res.status(500).send(err);

      const sorted_objects = objects.sort((e1,e2) => (e1.id-e2.id));

      res.send({data: sorted_objects});
    })
  });

  app.post("/api/gds", function(req, res){
    const {filter} = req.body;

    const db = req.app.locals.gds;
    db.list(function(err, objects){
      if (err) res.status(500).send(err);
      let result = [];

      if(filter === "all") {
        result = objects
      } else {
        result = objects.filter(({tag}) => tag === filter);
      }

      const sorted_result = result.sort((e1,e2) => (e1.id-e2.id));

      res.send({data: sorted_result});
    })
  });

  app.get("/api/services", function(req, res){

    const db = req.app.locals.services;
    db.list(function(err, objects){
      if (err) res.status(500).send(err);

      const sorted_objects = objects.sort((e1,e2) => (e1.id-e2.id));

      res.send({data: sorted_objects});
    })
  });

  app.post("/api/form", function(req, res){
    const db = req.app.locals.orders;
    const id = Math.floor(Math.random() * 10000000);
    const data = {id: Number(id), ...req.body};

    db.add(data, function(err) {
      if (err) res.status(500).send(err);
      res.send({data: data});
    });
  });

};
