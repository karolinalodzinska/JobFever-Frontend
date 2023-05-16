import React, {useState} from "react";
import {StyledBottomBox, StyledIconBox, StyledProfilePaper, StyledTopBox} from "./CandidateProfile.styles";
import ProfileContainerTitle from "../atoms/ProfileContainerTitle";
import {Box} from "@mui/material";
import EmployerAboutUsModal from "./EmployerAboutUsModal";
import {StyledEditIcon} from "../atoms/StyledEditIcon";
import {useEmployerById} from "../../api/EmployersApi";
import {useAuthorization} from "../../utils/AuthUtils";

export default function EmployerAboutUs(props) {
    const {data, loading} = useEmployerById(props.id);
    const [aboutUs, setAboutUs] = useState("");
    const [previousAboutUs, setPreviousAboutUs] = useState("");
    const {getEmployerId} = useAuthorization();

    React.useEffect(() => {
        if (!loading) {
            setPreviousAboutUs(data.aboutUs);
            setAboutUs(data.aboutUs);
        }
    }, [data]);

    const RenderEmployerAboutUsModal = (props) => {
        if (props.id === getEmployerId()) {
            return (
                <StyledIconBox>
                    <EmployerAboutUsModal
                        id={props.id}
                        text={"About Us.."}
                        tag={<StyledEditIcon/>}
                        previousAboutUs={previousAboutUs}
                    />
                </StyledIconBox>
            );
        }
    };

    if (!loading) {
        return (
            <StyledProfilePaper>
                <StyledTopBox>
                    <ProfileContainerTitle text={"About Us"}/>
                </StyledTopBox>
                <StyledBottomBox>
                    {aboutUs}
                    <Box>
                        <RenderEmployerAboutUsModal id={props.id}/>
                    </Box>
                </StyledBottomBox>
            </StyledProfilePaper>
        );
    }
}