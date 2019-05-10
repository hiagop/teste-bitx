import Router from 'express';
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
    Console.find({}, (err, consoles) => {
        if(err) { 
            res.json({ success: false, msg: err })
        } else {
            const consoleArr = [];
            consoles.forEach((consoleDoc: ConsoleModel) => {
                consoleArr.push({ 
                    id: consoleDoc._id,
                    name: consoleDoc.name,
                    company: consoleDoc.company 
                })
            });
            res.json({
                sucess: true,
                data: consoleArr
            });
        }
    })
});

router.get("/console/:name", (req, res) => {

    if(req.params.name) {
        Console.findOne({ name: req.params.name }, (err, consoleDoc: ConsoleModel) => {
            if(err) { 
                res.json({ success: false, msg: err })
            } else if(consoleDoc) {                
                const consoleData = { 
                    id: consoleDoc._id,
                    name: consoleDoc.name,
                    company: consoleDoc.company 
                };

                res.json({
                    success: true,
                    data: consoleData
                });
            }
        });
    }
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
            const _console = new Console({
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