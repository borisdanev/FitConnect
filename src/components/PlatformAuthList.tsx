import { useGoogleAuthMutation, setCurrentUser } from "../store";
import Grid from "@mui/material/Grid";
import PlatformAuth from "./PlatformAuth";
import { FaGoogle, FaGithub } from "react-icons/fa";
const PlatformAuthList: React.FC = () => {
  const [googleAuth, { error, isSuccess }] = useGoogleAuthMutation();
  // const [githubAuth] = useGithubAuthMutation();
  return (
    <Grid container columnSpacing={2} sx={{ mt: 2 }}>
      {[
        {
          icon: <FaGoogle />,
          platform: "Google",
          handler: async () => {
            const user = await googleAuth();
          },
        },
        { icon: <FaGithub />, platform: "GitHub", handler: () => {} },
      ].map((item, i) => (
        <Grid key={i} item xs={6}>
          <PlatformAuth
            icon={item.icon}
            platform={item.platform}
            handler={item.handler}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default PlatformAuthList;
