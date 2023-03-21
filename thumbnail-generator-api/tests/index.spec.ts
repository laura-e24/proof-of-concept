import log from 'why-is-node-running'
import chai from "chai"
import chaiHttp from "chai-http"
import app from "../src/app"
import { resizeImage } from "../src/helpers"
import fs from "node:fs/promises";
import * as filesystem from "fs";
import path from "node:path";
import sharp from "sharp"

chai.should()
chai.use(chaiHttp)
const expect = chai.expect

describe("1) Resize function", function() {
  const mockImg = "./tests/mock/mock.png"
  const mockPath = `${process.cwd()}\\thumbnails\\mocking.png`
  
  before(async () => {
    if (!filesystem.existsSync(`${process.cwd()}\\thumbnails`)) {
      filesystem.mkdirSync(`${process.cwd()}\\thumbnails`);
    }
    await resizeImage(120, 120, mockImg, "mock", "mocking")
  })

  after(async () => {
    await fs.unlink("./thumbnails/mocking.png");
  })

  it("I) Generates a new PNG thumbnail with the specified size", async () => {
    const metadata = await sharp(mockPath).metadata()
  
    expect(filesystem.existsSync(mockPath), "File does not exist.").to.be.true
    expect(metadata.width).to.be.equal(120)
    expect(metadata.height).to.be.equal(120)
  });
});

describe("2) API handles successfull requests", function() {
  it("I) API receives & processess PNG images successfully", (done) => {
    chai.request(app)
    .post('/')
    .set('Content-Type', 'image/png')
    .attach('img', "./tests/mock/mock.png")
    .end((err, response) => {
      response.should.have.status(200)
      expect(response.body).to.be.an("array")
      expect(response.body).to.have.length(3)
      if (err) done(err);
      else done()
    })
  });

  it("II) API receives & processess JPEG images successfully", (done) => {
    chai.request(app)
    .post('/')
    .set('Content-Type', 'image/png')
    .attach('img', "./tests/mock/mock.jpeg")
    .end((err, response) => {
      response.should.have.status(200)
      expect(response.body).to.be.an("array")
      expect(response.body).to.have.length(3)
      if (err) done(err);
      else done()
    })
  });

  it("III) API returns generated thumbnails's URLs", function (done) {
    chai.request(app)
    .post('/')
    .set('Content-Type', 'image/png')
    .attach('img', "./tests/mock/mock.png")
    .end((err, response) => {
      const newPath = `${process.cwd()}\\thumbnails`
      expect(response.body).to.deep.include(`${newPath}\\mock-sm.png`);
      expect(response.body).to.deep.include(`${newPath}\\mock-md.png`);
      expect(response.body).to.deep.include(`${newPath}\\mock-lg.png`);
      if (err) done(err);
      else done()
    })
  });

  it("IV) It's fast (<~500ms)", function (done) {
    this.timeout(500)
    chai.request(app)
    .post('/')
    .set('Content-Type', 'image/png')
    .attach('img', "./tests/mock/mock.png")
    .end((err, response) => {
      if (err) done(err);
      else done()
    })
  });
});

describe("3) API handles rejected requests", function () {
  after(async function () {
    for (const file of await fs.readdir("./uploads")) {
      await fs.unlink(path.join("./uploads", file));
    }

    for (const file of await fs.readdir("./thumbnails")) {
      await fs.unlink(path.join("./thumbnails", file));
    }

    await fs.rmdir("./uploads")
    await fs.rmdir("./thumbnails")
  });

  it("I) API rejects non-PNG and non-JPEG files", (done) => {
    chai.request(app)
    .post('/')
    .set('Content-Type', 'image/png')
    .attach('img', "./tests/mock/mock.jpg")
    .end((err, response) => {
      response.should.have.status(415)
      expect(response.body).to.be.equal('File extension must be either PNG or JPEG.')
      if (err) done(err);
      else done()
    })
  });

  it("II) API rejects >11MB files", (done) => {
    chai.request(app)
    .post('/')
    .set('Content-Type', 'image/png')
    .attach('img', "./tests/mock/big-file.png")
    .end((err, response) => {
      response.should.have.status(400)
      expect(response.body).to.be.equal('File size must not exceed 11MB.')
      if (err) done(err);
      else done()
    })
  });

  it("III) It's fast (<~500ms)", function (done) {
    this.timeout(500)
    chai.request(app)
    .post('/')
    .set('Content-Type', 'image/png')
    .attach('img', "./tests/mock/mock.jpg")
    .end((err, response) => {
      if (err) done(err);
      else done()
    })
  });
});

/***  Uncomment to check for tasks that keeps the process running ***/
// describe("4) Checking for running processes", function () {
//   it("Current running processes...", function () {
//     setTimeout(function () {
//       log() // logs out active handles that are keeping node running
//     }, 100)
//   })
// })