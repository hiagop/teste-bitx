import Router from 'express';
import crypto from 'crypto';
import { default as Game, GameModel } from '../models/game';
import { default as Console, ConsoleModel} from '../models/console';

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
    
    Console.findOne({ name: req.body.name }, (err, foundConsole) => {
        if(err) { res.json({ success: false, msg: err }) };
        if(foundConsole) {
            res.json({ success: false, msg: "Console já cadastrado." })
        } else {
            const hash = crypto.createHash("sha256").update(req.body.name)
            const _console = new Console({
                id: hash.digest("hex"),
                name: req.body.name,
                company: req.body.company
            });
            _console.save((err) => {
                if(err) {
                    res.json({ success: false, msg: err })
                } else {
                    res.json({ success: true })
                }

            })
            
        }
    })
});
router.post("/game", (req, res) => {
    res.json(req.body)
});

export default router;