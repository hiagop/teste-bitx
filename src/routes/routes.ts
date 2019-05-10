import Router from 'express';

const router = Router();

router.get("/", (req, res) => {
    res.json({
            "all consoles": "/consoles",
            "consoles by name":"/console/<console_name>",
            "all games":"/games",
            "all games by console":"/games/<console_name>",
            "games by title":"/game/<game_title>"
    });
})

router.get("/consoles", (req, res) => {
    res.json({
        success: true,
        data: {}
    })
});
router.get("/console/:name", (req, res) => {

    if(req.params.name) {
        res.json({name: req.params.name})
    }

    res.json({
        success: true,
        data: {}
    })
});
router.get("/games", (req, res) => {
    res.json({
        success: true,
        data: {}
    })
});
router.get("/games/:console", (req, res) => {
    res.json({
        success: true,
        data: {}
    })
});
router.get("/game/:title", (req, res) => {
    res.json({
        success: true,
        data: {}
    })
});

router.post("/console", (req, res) => {
    res.json(req.body)
});
router.post("/game", (req, res) => {
    res.json(req.body)
});

export default router;