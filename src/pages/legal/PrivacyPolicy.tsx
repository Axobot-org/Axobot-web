import { Box, Link, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { ExternalRoutesURLs } from "../../router/router";
import { ExternalLink, SubtitleSection, TitleSection } from "./shared";

export default function PrivacyPolicy() {
  return (
    <Fragment>
      <Typography my={2} variant="h3" textAlign="center">Axobot - Privacy Policy</Typography>

      <Box mt={{ xs: 2, md: 4 }} mb={6}>
        <Typography variant="body2" fontStyle="italic">
          Date of the latest revision: July 19th, 2024.
        </Typography>

        <TitleSection title="1. Object">
          <p>
            This document (hereinafter the "<b>Privacy Policy</b>") aims to describe the conditions under which Axobot (hereinafter "<b>Axobot</b>" "we" "our" "us") collects and processes personal data (hereinafter the "Data") of users using the service provided by Axobot (hereinafter the "<b>User</b>" or "you") during its use.
          </p>
          <p>
            Any individual using Axobot acknowledges having fully understood the Privacy Policy at the time of its implementation or use.
          </p>
          <p>
            Axobot is available in its official version on the website <ExternalLink href="https://axobot.xyz" />. It may also occasionally be accessible on mirror sites or listing sites.
          </p>
          <p>
            The service(s) offered by Axobot (hereinafter the "<b>Service</b>") consist of adding additional features to the Discord platform, all detailed in the documentation available at <ExternalLink href="https://axobot.readthedocs.io" />.
          </p>
          <p>
            This page explains our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have regarding these data.
          </p>
          <p>
            We use your data to provide and improve the Service. By using the Service, you consent to the collection and use of information in accordance with this policy.
          </p>
          <p><b>
            Since Axobot relies on the DISCORD platform, it is the User's responsibility to inquire about the security policy implemented by DISCORD (<ExternalLink href="https://discord.com" />) and any exceptions this policy may bring to our Privacy Policy, particularly by recording certain data collected by Axobot in a way that is transparent to us.
          </b></p>
        </TitleSection>

        <TitleSection title="2. Definitions">
          <ul>
            <li><b>Service</b><br />
              <p>Service refers to the additional features provided by Axobot in using the Discord platform, all detailed in the documentation available at <ExternalLink href="https://axobot.readthedocs.io" />.</p>
            </li>
            <li><b>Discord Platform or Discord</b><br />
              <p>Discord is a service providing a chat function and a social platform accessible at <ExternalLink href="https://discord.com" />. All rights and terms of use for this platform are available at the same address.</p>
            </li>
            <li><b>Personal Data</b><br />
              <p>Personal Data refers to data about a living individual who can be identified from those data (or from those data and other information in our possession or likely to come into our possession).</p>
            </li>
            <li><b>Usage Data</b><br />
              <p>Usage Data is collected automatically and generated either by the use of the Service or voluntarily by the Users of the Service (e.g., Service configuration, usage statistics).</p>
            </li>
          </ul>
        </TitleSection>

        <TitleSection title="3. Data collection and use">
          <p>
            We collect several types of data for different purposes but solely to provide you with our Service and improve it. These Data are detailed in the following section.
          </p>

          <SubtitleSection title="3.1 Types of Data Collected">
            <p>
              The Data collected by the Service are those posted by Users in channels defined by Users when administering a server and generally any information communicated through Discord's services.
            </p>
            <p>
              Some of the Data is stored in databases hosted on our servers to provide our Service optimally, either directly entered by the User (e.g., Service configuration) or automatically during your use of the Discord platform (e.g., experience level system related to your activity in text channels) following the activation of a Service feature.
            </p>
            <p>
              Other Data may be loaded into the RAM of the server hosting the Axobot Service for smooth and responsive operation of the Axobot application. These Data loaded into RAM are in no case collected, recorded in databases, or exported to files.
            </p>
            <p>
              No use of the Data is made for commercial purposes.
            </p>
            <p>
              Data collection is carried out solely for support purposes, Service improvement, or statistical purposes. These uses are detailed in Article 5 below. This statistical information is accessible through the Discord platform. The commands made available to the User to view the statistics are available in the Service's general documentation at <ExternalLink href="https://axobot.readthedocs.io" />.
            </p>
          </SubtitleSection>

          <SubtitleSection title="3.2 Use of Data">
            <p>Axobot uses the collected Data to:</p>
            <ul>
              <li>Provide and ensure our Service</li>
              <li>Inform you of changes to our Service</li>
              <li>Allow you to use interactive features of our Service when you choose to</li>
              <li>Provide customer support</li>
              <li>Gather analysis data to improve our Service</li>
              <li>Monitor the usage of our Service</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>
            <p>All collected Data:</p>
            <ul>
              <li>Are obtained and processed fairly and lawfully;</li>
              <li>Are recorded for specified and legitimate purposes;</li>
              <li>Are used in accordance with these purposes;</li>
              <li>Are adequate, relevant, and not excessive in relation to these purposes;</li>
              <li>Will be subject to precautions to ensure the security and confidentiality of the Data to prevent them from being damaged, modified, destroyed, or disclosed to unauthorized third parties.</li>
            </ul>
          </SubtitleSection>
        </TitleSection>

        <TitleSection title="4. Data transfer">
          <p>
            Data collected by Axobot are only stored on our server hosted by Hetzner in Germany (<ExternalLink href="https://www.hetzner.com" />).
          </p>
          <p>
            Axobot will take all reasonably necessary measures to ensure that your data are treated securely and in accordance with this Privacy Policy and that your Personal Data will not be transferred to any organization or country unless adequate controls are in place, including the security of your data and other personal information.
          </p>
        </TitleSection>

        <TitleSection title="5. Data disclosure">
          <p>Axobot may disclose your Personal Data if it believes in good faith that such action is necessary to:</p>
          <ul>
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of Axobot</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>Ensure the personal safety of users of the Service or the public</li>
            <li>Protect against legal liability</li>
          </ul>
        </TitleSection>

        <TitleSection title="6. Data security">
          <p>
            The security of your data is important to us. However, remember that no method of data transmission over the Internet or method of electronic storage is 100% secure. While we strive to use appropriate methods to protect your Data, we cannot guarantee its absolute security. Axobot is a free Service, and our financial means are currently limited. We do our best within what is financially possible and reasonable.
          </p>
        </TitleSection>

        <TitleSection title="7. Service providers">
          <p>
            We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related services, or help us analyze how our Service is used.
          </p>
          <p>
            These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
        </TitleSection>

        <TitleSection title="8. Links to other sites">
          <p>
            Our Service may use or link to other third-party services that we do not control. If you wish to view them, we strongly recommend that you review their respective privacy policies.
          </p>
          <p>
            We have no control over the content, privacy policies, or practices of third-party sites or services and disclaim any responsibility for them.
          </p>
        </TitleSection>

        <TitleSection title="9. Minors' privacy">
          <p>
            Our Service is not intended for persons under 18 ("Minors").
          </p>
          <p>
            We do not knowingly collect personally identifiable data from persons under 18. If you are a parent or guardian and you know that your Minor has provided us with Personal Data, please contact us. If we learn that we have collected Personal Data from children without verifying parental consent, we take steps to delete that information from our servers.
          </p>
        </TitleSection>

        <TitleSection title="10. Changes to this privacy policy">
          <p>
            We reserve the right to update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            We advise you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </TitleSection>

        <TitleSection title="11. Contact us">
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>By email: <Link href="mailto:z.runner.mc@gmail.com">z.runner.mc@gmail.com</Link></li>
            <li>On Discord: <ExternalLink href={ExternalRoutesURLs.supportServer} /></li>
          </ul>
        </TitleSection>

      </Box>
    </Fragment>
  );
}

export const Component = PrivacyPolicy;