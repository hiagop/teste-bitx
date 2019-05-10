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
                res.json({
                    success: true,
                    data: { 
                        id: consoleDoc._id,
                        name: consoleDoc.name,
                        company: consoleDoc.company 
                    }
                });
            }
        });
    }
});

router.get("/games", (req, res) => {
    Game.find({}, (err, games) => {
        if(err) { 
            res.json({ success: false, msg: err })
        } else {
            const gameArr = [];
            games.forEach((gameDoc: GameModel) => {
                gameArr.push({ 
                    id: gameDoc._id,
                    name: gameDoc.name,
                    console_name: gameDoc.console_name
                })
            });
            res.json({
                sucess: true,
                data: gameArr
            });
        }
    })
});

router.get("/games/:console", (req, res) => {
    if(req.params.console) {
        Game.find({console_name: req.params.console }, (err, games) => {
            if(err) { 
                res.json({ success: false, msg: err })
            } else {
                const gameArr = [];
                games.forEach((gameDoc: GameModel) => {
                    gameArr.push({ 
                        id: gameDoc._id,
                        name: gameDoc.name,
                        console_name: gameDoc.console_name
                    })
                });
                res.json({
                    sucess: true,
                    data: gameArr
                });
            }
        });
    }
});

router.get("/game/:name", (req, res) => {
    if(req.params.name) {
        Game.findOne({ name: req.params.name }, (err, gameDoc: GameModel) => {
            if(err) { 
                res.json({ success: false, msg: err })
            } else if(gameDoc) {                
                res.json({
                    success: true,
                    data: { 
                        id: gameDoc._id,
                        name: gameDoc.name,
                        console_name: gameDoc.console_name 
                    }
                });
            }
        });
    }
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
    Game.findOne({ name: req.body.name }, (err, foundGame) => {
        if(err) { res.json({ success: false, msg: err}) };
        if(foundGame) {
            res.json({ success: false, msg: "Jogo já cadastrado." })
        } else {
            const _game = new Game({
                name: req.body.name,
                console_name: req.body.console_name
            });
            _game.save((err) => {
                if(err) {
                    res.json({ success: false, msg: err })
                } else {
                    res.json({ success: true })
                }
            });
        }
    });
});

export default router;