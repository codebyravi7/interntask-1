import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const calendar = google.calendar("v3");
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

exports.createEvent = async (req, res) => {
  try {
    const { summary, description, startTime, endTime } = req.body;

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const event = {
      summary,
      description,
      start: {
        dateTime: startTime,
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: endTime,
        timeZone: "America/Los_Angeles",
      },
    };

    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: "primary",
      resource: event,
    });

    res
      .status(200)
      .json({ msg: "Event created successfully", event: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to create event" });
  }
};
