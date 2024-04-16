const Express = require('express');
const CORS = require('cors');
const fs = require('fs');
const port = 8000;
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('./db/mongoose');
const UserModel = require('./db/userModel');
const cookieparser = require('cookie-parser');
const placeModel = require('./db/place');
const bcrypt = require('bcryptjs');

const imagedownloader = require('image-downloader');
const multer = require('multer');
const PhotosmiddleWare = multer({ dest: 'upload' });

const app = Express();

app.use(CORS({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use('/upload', Express.static(__dirname + '/upload'));
app.use(Express.json());
app.use(cookieparser());
app.use(Express.urlencoded({
    extended: false,
}));

app.set('uploads', path.join(__dirname + 'upload'));

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtsecret = 'kfbqerkjbfkerbfkjqbgi34br3fb';

app.get('/test', (req, res, next) => {
    res.send('hello');
})

app.post('/register', async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const Userdata = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
        res.json(Userdata)
    } catch (e) {
        return res.status(423).json('err');
    }
});

app.post('/login', async (req, res, next) => {
    const { name, email, password } = req.body;
    const UserDoc = await UserModel.findOne({ email });
    if (UserDoc) {
        const passOK = bcrypt.compareSync(password, UserDoc.password);
        if (passOK) {
            jwt.sign({ email: UserDoc.email, id: UserDoc._id }, jwtsecret, {}, (err, token) => {
                if (err) {
                    throw err;
                }
                return res.cookie('token', token).json(UserDoc);

            })
        }
        else {
            res.status(422).json('pass not match')
        }
    }
    else {
        return res.status(422).json('not found');
    };


});

app.get('/profile', (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtsecret, {}, async (err, user) => {
            if (err) {
                throw err;
            } else {
                const { name, email, _id } = await UserModel.findById(user.id);
                res.json({ name, email, _id });
            }
        });
    }
    else {
        return res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = Date.now() + '.jpg';
    if (link) {
        await imagedownloader.image({
            url: link,
            dest: __dirname + '/upload/' + newName,
        });
        res.json(newName);
    }
    else {
        return res.json('err');
    }
})

app.post('/upload', PhotosmiddleWare.array('photo', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('upload\\', ''));
    }
    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title,
        address,
        description,
        addedphotos,
        perks,
        extrainfo,
        checkin,
        checkout,
        maxguests,
        price
    } = req.body;
    if (token) {
        jwt.verify(token, jwtsecret, {}, async (err, user) => {
            if (err) {
                throw err;
            }
            const placeDoc = await placeModel.create({
                owner: user.id,
                title,
                photos: addedphotos,
                address,
                perks,
                extrainfo,
                checkin,
                checkout,
                maxguests,
                description,
                price

            });
            res.json(placeDoc);
        });
    }
});

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtsecret, {}, async (err, user) => {
        const { id } = user;
        res.json(await placeModel.find({ owner: id }));
    });
});

app.get('/places/:_id', async (req, res) => {
    const { _id } = req.params;
    res.json(await placeModel.findById({ _id }))
});

app.put('/places/', async (req, res) => {
    const { token } = req.cookies;
    const {
        _id,
        title,
        address,
        description,
        addedphotos,
        perks,
        extrainfo,
        checkin,
        checkout,
        maxguests,
        price
    } = req.body;

    jwt.verify(token, jwtsecret, {}, async (err, user) => {
        if (err) throw err;
        const placedoc = await placeModel.findById({ _id });
        // console.log(user.id);
        // console.log(placedoc.owner.toString());
        if (user.id === placedoc.owner.toString()) {
            placedoc.set({
                title,
                photos: addedphotos,
                address,
                perks,
                extrainfo,
                checkin,
                checkout,
                maxguests,
                description,
                price
            });
            await placedoc.save();
            res.json('ok');
        }
    });
});


app.get('/places', async (req, res) => {
    res.json(await placeModel.find());
})

app.listen(port, (err, data) => {
    if (err) {
        console.log(`error${err}`)
    }
    else {
        console.log(`server is working fine and is listening to http://localhost:${port}`);
    }
});