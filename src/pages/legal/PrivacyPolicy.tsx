/* eslint-disable @stylistic/jsx-one-expression-per-line */
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
          Date of the latest revision: August 8th, 2024.
        </Typography>

        <TitleSection title="1. Object">
          <p>
            This document (hereinafter the "<b>Privacy Policy</b>") aims to describe the conditions under which Axobot (hereinafter "<b>Axobot</b>" "we" "our" "us") collects and processes data (hereinafter the "<b>Data</b>" or "Usage Data") of users (hereinafter the "<b>User</b>" or "you") during the use of the service provided by Axobot.
          </p>
          <p>
            By using Axobot, you acknowledge that you have fully understood and agree to this Privacy Policy at the time of its implementation or use.
          </p>
          <p>
            Axobot is officially available on our website at <ExternalLink href="https://axobot.xyz" />. It may also be accessible on mirror or listing sites occasionally.
          </p>
          <p>
            The service(s) offered by Axobot (hereinafter the "<b>Service</b>") consist of adding additional features to the Discord platform. Detailed information about these features can be found in our documentation at <ExternalLink href="https://axobot.readthedocs.io" />.
          </p>
          <p>
            This page outlines our policies regarding the collection, use, and disclosure of usage or personal data when you use our Service, as well as the choices you have concerning your data.
          </p>
          <p>
            We use your data to provide and enhance our Service. By using the Service, you consent to the collection and use of your data in accordance with this Privacy Policy.
          </p>
          <p>
            <b>
              Since Axobot relies on the Discord platform, it is the User's responsibility to inquire about the security policy implemented by Discord (<ExternalLink href="https://discord.com" />) and any exceptions this policy may bring to our Privacy Policy, particularly by recording certain data collected by Axobot in a way that is transparent to us.
            </b>
          </p>
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
              <p>Personal Data refers to any information that relates to an identified or identifiable natural person, as defined by the European General Data Protection Regulation (GDPR).</p>
            </li>
            <li><b>Usage Data</b><br />
              <p>Usage Data is collected automatically and generated either by the use of the Service or voluntarily by the Users of the Service (e.g., Service configuration, usage statistics).</p>
            </li>
          </ul>
        </TitleSection>

        <TitleSection title="3. Data collection and use">
          <p>
            We collect various types of data solely to provide and enhance our Service. The details of these data are outlined in the following sections.
          </p>

          <SubtitleSection title="3.1 Types of Data Collected">
            <p>
              The Data collected by the Service include information posted by Users in channels they define when administering a server, and any information communicated through Discord's services.
            </p>
            <p>
              Some of the Data is stored in databases on our servers to optimally provide our Service. These Data can be directly entered by the User (e.g., Service configuration) or collected automatically during your use of the Discord platform (e.g., experience level system related to your activity in text channels) after activating a Service feature.
            </p>
            <p>
              Other Data may be temporarily loaded into the RAM of the server hosting the Axobot Service to ensure smooth and responsive operation. These Data are never collected, stored in databases, or exported to files, and are regularly purged from the server's memory.
            </p>
            <p>
              No use of the Data is made for commercial purposes.
            </p>
            <p>
              Data collection is carried out solely for support purposes, Service improvement, or statistical purposes. These uses are detailed in Article 3.2 below.
            </p>
            <p>
              The only type of Personal Data we may store is your User ID, a numerical identifier generated by the Discord API that identifies your Discord account. This ID does not grant us access to other personal information such as your name or phone number.
            </p>
          </SubtitleSection>

          <SubtitleSection title="3.2 Use of Data">
            <p>Axobot uses the collected Data to:</p>
            <ul>
              <li>Provide and maintain our Service</li>
              <li>Inform you of changes to our Service</li>
              <li>Allow you to use interactive features of our Service when you choose to</li>
              <li>Provide customer support</li>
              <li>Gather analytical data to improve our Service</li>
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

          <SubtitleSection title="3.3 How long do we store your Data?">
            <p>
              We do not keep your Data indefinitely: we delete your Data when it is no longer required. We use your User ID only as long as it is active, i.e. as long as Discord has not deleted your account, and no longer than three (3) years after that date.
            </p>
            <p>
              We may retain such Data longer if it is necessary to establish a claim or is required by law. In such cases, the Data will be kept in archive form, separate from other data, and for a period of time that complies with legal obligations or statutory time limits.
            </p>
          </SubtitleSection>

          <SubtitleSection title="3.4 Your rights regarding your Data">
            <p>
              You may request access to or deletion of your data if necessary. See Article 11 for contact details.
            </p>
            <p>
              If you believe we are not respecting your rights or our obligations, you can lodge a complaint directly with the CNIL at <ExternalLink href="https://cnil.fr" />.
            </p>
          </SubtitleSection>
        </TitleSection>

        <TitleSection title="4. Data transfer">
          <p>
            Data collected by Axobot are only stored on our server hosted by Hetzner in Germany (<ExternalLink href="https://hetzner.com" />).
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
            If you wish to exercise your rights or ask us a question about this privacy policy, please contact us at:
          </p>
          <ul>
            <li>By email: <Link href="mailto:z.runner.mc@gmail.com">z.runner.mc@gmail.com</Link></li>
            <li>On Discord: <ExternalLink href={ExternalRoutesURLs.supportServer} /></li>
          </ul>
          <p>
            If you wish to exercise any of the above rights, please contact the Bot support server at <ExternalLink href={ExternalRoutesURLs.supportServer} />. Log in with the User account for which you wish to exercise your right to access or delete data in order to provide us with proof of your identity.
          </p>
          <p>
            We commit to handling your requests as promptly as possible.
          </p>
        </TitleSection>

      </Box>
    </Fragment>
  );
}

export const Component = PrivacyPolicy;
