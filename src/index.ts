import os from 'os';
import axios from 'axios';

interface CheckResponse {
  status: boolean;
  [key: string]: any;
}

function getHardwareInfo() {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus().length,
    totalmem: os.totalmem(),
    freemem: os.freemem(),
    uptime: os.uptime(),
  };
}

export async function checkServer(apiUrl: string) {
  try {
    const hardwareInfo = getHardwareInfo();
    const response = await axios.post<CheckResponse>(apiUrl, hardwareInfo);

    if (!response.data.status) {
      console.error("Unauthorized server. Shutting down.");
      process.exit(1); // 💀 This kills the server
    } else {
      console.log("Server validation successful.");
    }
  } catch (error) {
    console.error("Server validation failed. Shutting down.");
    console.error(error);
    process.exit(1);
  }
}
