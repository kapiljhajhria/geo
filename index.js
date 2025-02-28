import express from "express";
import requestIp from "request-ip";
import geoip from "geoip-lite";
import useragent from "express-useragent";

const app = express();
app.use(requestIp.mw());
app.use(useragent.express());

app.get("/", (req, res) => {
  const ip =
    req.clientIp || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const geo = geoip.lookup(ip) || {};
  res.json({ ip, geo, userAgent: req.useragent });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
export default app;
