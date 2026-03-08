import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("Admin API", () => {
  it("should return agent configuration", async () => {
    const res = await request(app).get("/api/admin/agents");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("ForecastAgent");
  });

  it("should return system logs", async () => {
    const res = await request(app).get("/api/admin/logs");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });
});
