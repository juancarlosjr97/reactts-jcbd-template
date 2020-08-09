import React, { useEffect } from "react";
import { Snackbar, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import environment from "@environment";
import * as serviceWorker from "@services/service-worker/service-worker";
import { LocalStorageService } from "@utils/storage/local-storage/local-storage";

const localStorage = new LocalStorageService();
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

const ServiceWorkersService: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  const getServiceWorkersUpdateStatus = (): boolean => {
    if (!localStorage.existLocalStorage("serviceWorkersOnUpdate")) {
      return false;
    }

    return Boolean(localStorage.getLocalStorage("serviceWorkersOnUpdate")?.updateStatus);
  };

  const [showReload, setShowReload] = React.useState(getServiceWorkersUpdateStatus());
  const [waitingWorker, setWaitingWorker] = React.useState<ServiceWorker | null>(null);

  const onServiceWorkerUpdated = (registration: ServiceWorkerRegistration) => {
    setShowReload(true);

    localStorage.setLocalStorage(
      "serviceWorkersOnUpdate",
      {
        updateStatus: true,
      },
      false
    );

    setWaitingWorker(registration.waiting);
  };

  const reloadPage = async () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });

    if (!waitingWorker) {
      const registration = await navigator.serviceWorker.getRegistration();
      registration?.update();
    }

    setShowReload(false);

    localStorage.setLocalStorage(
      "serviceWorkersOnUpdate",
      {
        updateStatus: false,
      },
      false
    );

    window.location.reload(true);
  };

  useEffect(() => {
    if (environment.PRODUCTION) {
      serviceWorker.register({ onUpdate: onServiceWorkerUpdated });
    } else {
      serviceWorker.unregisterServiceWorker();
    }
  }, []);

  return (
    <>
      <Snackbar
        open={showReload}
        message="A new version is available!"
        onClick={reloadPage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={
          <Button variant="contained" color="primary" className={classes.margin} size="medium" onClick={reloadPage}>
            Update App
          </Button>
        }
      />
    </>
  );
};

export default ServiceWorkersService;
