import { app } from './index';
import { PORT } from './config/config';





app.listen(PORT, (e?: Error) => {
    if (e) {
        throw new Error(`Server not started: ${e?.message}`);
    }
    console.log("Server started Successfully");
});
