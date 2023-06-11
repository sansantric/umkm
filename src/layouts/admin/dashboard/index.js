// @mui material components
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Soft UI Dashboard React examples
import PageLayout from "examples/LayoutContainers/PageLayout";

function Dashboard() {
    return (
        <PageLayout>
            <Box sx={{ flexGrow: 2, marginLeft: "100px", marginRight: "100px" }}>
                <Grid container rowSpacing={10} columnSpacing={10}>
                <Grid item container direction="row" justifyContent="center" alignItems="center" sx={{marginBottom: "50px"}}>
                    <Typography variant="h3" style={{ margin: "30px" }}>
                        Dashboard Admin
                    </Typography>
                </Grid>
                </Grid>
            </Box>
        </PageLayout>
    )
}

export default Dashboard;