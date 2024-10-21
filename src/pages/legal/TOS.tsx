/* eslint-disable @stylistic/jsx-one-expression-per-line */
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, IconButton, Link, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

import { ExternalRoutesURLs } from "../../router/router";
import { useIsOnMobile } from "../../styles/useIsOnMobile";
import { ExternalLink, Subtitle2Section, SubtitleSection, TitleSection } from "./shared";

const TOSSummary = () => {
  const isOnMobile = useIsOnMobile();
  const [isOpen, setIsOpen] = useState(!isOnMobile);

  const Icon = isOpen ? ExpandLess : ExpandMore;

  return (
    <Paper sx={{ mt: { xs: 2, md: 4 }, p: 2, width: "100%", backgroundColor: "#318167" }}>
      <Stack useFlexGap direction="row" gap={2} justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Summary</Typography>
        <IconButton onClick={() => setIsOpen(!isOpen)}>
          <Icon />
        </IconButton>
      </Stack>
      <Collapse in={isOpen}>
        <p><b>Disclaimer:</b> This is a human readable summary of Axobot Terms of Use, not a substitute for them. To read the full Terms of Use, please scroll down.</p>
        <ul>
          <li><b>Free updates:</b> Axobot is provided to users free of charge (Section 1), and additional functionalities can be added at any time (Section 2.4).</li>
          <li><b>Service Security:</b> Users are encouraged to report any security breaches, and we take prompt action to remedy them (Section 2.4).</li>
          <li><b>Right to Terminate:</b> Users can terminate the use of the Features at any time (Section 2.5.1).</li>
          <li><b>Terms Modification:</b> The Terms may be modified or replaced at any time without notice, and continued use constitutes acceptance (Section 1, Section 5.2).</li>
          <li><b>Compliance Responsibility:</b> Users are responsible for compliance with all applicable laws in their jurisdiction and must adhere to Discord's General Terms of Use. (Section 2.3, Section 2.5)</li>
          <li><b>Content Liability:</b> Users are solely liable for any content they upload, and the Owner can remove content at its discretion (Section 3.2.3).</li>
          <li><b>No Warranties:</b> The Features and access to the Platform are provided "as is" and "as available," without warranties (Section 4.1).</li>
          <li><b>Platform Interruption Notices:</b> Users will be informed appropriately about interruptions for maintenance or updates (Section 5.3).</li>
        </ul>
      </Collapse>
    </Paper>
  );
};

export default function TOS() {
  return (
    <Fragment>
      <Typography my={2} variant="h3" textAlign="center">Axobot – Terms of Use</Typography>

      <Box mt={{ xs: 2, md: 4 }} mb={6} width="100%">
        <Typography variant="body2" fontStyle="italic">
          Date of the latest revision: August 8th, 2024.
        </Typography>

        <Typography fontWeight="bold" my={2} textAlign="justify">Please read these Terms of use carefully before using the Features. Before using any of the Features, you must first agree to these Terms. By accessing the Features or by otherwise using them, you expressly confirm that you fully and irrevocably agree to these Terms.</Typography>

        <p>This Platform and the Features are provided by: Arthur BLAISE, France. Contact us on our <Link href={ExternalRoutesURLs.supportServer}>Discord server</Link>, or by email at <Link href="mailto:z.runner.mc@gmail.com">z.runner.mc@gmail.com</Link>.</p>


        <TOSSummary />

        <TitleSection title="1. Acceptance of terms – Change of Terms">
          <p>The purpose of these terms of use (the “<b>Terms</b>”) is to define the terms and conditions of use applicable to the users (a “<b>User</b>”, “<b>Features User</b>” “<b>you</b>” or “<b>your</b>”), when using our software application running automated tasks over Discord (the “<b>Bot</b>” or the “<b>Axobot Software</b>”), our platform located at <ExternalLink href="https://axobot.xyz" />, including the Application Program Interface (API), the website (the “<b>Platform</b>” or the “<b>Website</b>”) and related features offered from time to time on the Platform, including through the License (the “<b>Features</b>”).</p>

          <p>You also agree that personal data and electronic communications on our Platform or through the use of the Features will be processed in accordance with our data privacy policy, available on <ExternalLink href="https://axobot.xyz/privacy" />.</p>

          <p>We reserve the right, at our sole discretion, to modify or replace the Terms at any time. The most current version of these Terms will be posted on the Platform. You shall be responsible for reviewing and becoming familiar with any such modifications.</p>

          <p>You will be deemed to have accepted all modifications and revisions of the Terms by continuing to use all or part of the Features and/or the Platform.</p>

          <p>As Axobot is based on the Discord platform, it is the User's responsibility to inform himself/herself of the General Terms of Use implemented by Discord (<ExternalLink href="https://discord.com" />) and of any exceptions that these conditions may make to our General Terms of Use.</p>

          <p>Axobot is an application that is made available to its Users free of charge. The User is advised that support and maintenance of Axobot is carried out according to the free time of its developers and that no guarantee is given to Users.</p>
        </TitleSection>

        <TitleSection title="2. PROVISIONS OF AND ACCESS TO FEATURES">
          <SubtitleSection title="2.1 Provider">
            <p>Unless specified otherwise in these Terms or on the Platform, the Platform is operated, the License is granted and the Features are offered by Arthur BLAISE (the “<b>Owner</b>”, “<b>we</b>”, “<b>us</b>” or “<b>our</b>”). Some illustrative images and logos on the Website have been created by Adrien GRECO (<ExternalLink href="https://adriengreco.fr" />).</p>
            <p>Axobot is not acting as an agent or service provider of the Discord platform (available at <ExternalLink href="https://discord.com" /> (“<b>Discord</b>”) and/or its owner(s) or representative(s).</p>
          </SubtitleSection>

          <SubtitleSection title="2.2 Hosting">
            <p>The Website, the Bot and the related database are hosted by Hetzner Online GmbH (Industriestr. 25, 91710 Gunzenhausen, Germany, see <ExternalLink href="https://hetzner.com" />).</p>
          </SubtitleSection>

          <SubtitleSection title="2.3 User’s Eligibility">
            <p>You hereby represent and warrant that you are fully able and competent to enter the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms and to abide by and comply with these Terms.</p>
            <p>You also represent and warrant that you are legally authorized in your jurisdiction to use the Features and to interact with the Features in any way. Finally, you represent and warrant that you are solely responsible for compliance with all applicable laws in your jurisdiction, and release Axobot from any liability in this regard.</p>
          </SubtitleSection>

          <SubtitleSection title="2.4 Features">
            <p>User has access to the Features described on the Platform, in the form and according to the technical means and functionalities that Axobot deems most appropriate.</p>
            <p>The main Features offered by Axobot as of the day of this terms of use are the following:</p>
            <ul>
              <li>Streaming and RSS Feeds Alerts;</li>
              <li>Members Activity Rewards;</li>
              <li>Welcome Messages;</li>
              <li>Server Management;</li>
              <li>Automated and Semi-Automated Server Moderation.</li>
            </ul>
            <p>Additional functionalities can be added at any time. Any functionality can be suppressed at any time without any prior notice, at the Owner sole discretion.</p>
          </SubtitleSection>

          <SubtitleSection title="2.5 Account Usage">
            <p>Use of the Service is solely via the Discord platform and must therefore comply with its General Terms of Use. In addition to these, the User undertakes, each time he or she uses the Service, to behave in a normal and reasonable manner and not to hinder, in any way whatsoever, its smooth operation.</p>
            <p>Users may also use the certain services or functionalities without registering or creating a User account, however, this may cause limited availability of certain features or functions.</p>
            <p>Certain features of the Service are only available on "servers", as defined in Discord's Terms of Use. It is the responsibility of the administrators of the said server to ensure the proper use of the Service within this server. In particular, the server administrators undertake to implement any security system necessary to prevent misuse of the Service by other server members. We cannot be held responsible for damage caused by misuse of our Service.</p>
            <p>Users are required to immediately and unambiguously inform Axobot via the contact details indicated in this document, if they think their personal information, including but not limited to User accounts, access credentials or personal data, have been violated, unduly disclosed, or stolen.</p>
            <p>The User must inform us without delay if they become aware of any security breach, including any possibility of misuse of the Service's functionalities for dishonest purposes, so that we can take all appropriate measures without delay to remedy the security breach.</p>
            <p>In the event of a security breach identified by us, which could compromise the security of the Service or its use, we reserve the right to suspend the Service temporarily or permanently, without prior notice, in order to remedy the security breach as quickly as possible.</p>
            <p>The Owner cannot and will not be liable for any loss or damage arising from your failure to comply with this section.</p>
          </SubtitleSection>

          <SubtitleSection title="2.6 Duration of and access to the Features and the License">
            <Subtitle2Section title="2.6.1 Termination">
              <p>The Owner may at any time and without liability, terminate, suspend, or limit your use of the Features, in the event that (a) we reasonably suspect you of acting in breach of these Terms and/or all other applicable provision; (b) we are required to do so by applicable law, regulation or any court or other authority to which we are subject to in any jurisdiction; (c) we have concerns about the security of your account or we suspect the Features are being used in a fraudulent or unauthorized manner; (d) we reasonably believe that we need to do so in order to protect our reputation; (e) we decide to stop for whatever reason our activity in full or part.</p>
              <p>You shall not be entitled to any compensation or damages whatsoever from the Owner into any suspension, limitation, or termination of your use of the Features due to a breach of the Terms.</p>
              <p>Our rights of suspension, limitation and termination under these Terms shall be without prejudice to any other rights or remedies which we may have (whether under the Terms or applicable law and regulations).</p>
              <p>User may terminate the use of the Features at any time.</p>
            </Subtitle2Section>
            <Subtitle2Section title="2.6.2 Consequences of Termination">
              <p>You will no longer be entitled nor able to use the Features and benefit from the License concerning Axobot Software.</p>
              <p>Upon the effective date of termination, all License rights granted under the Terms prior to termination shall immediately terminate and you shall immediately cease all use of the Bot and related Features.</p>
            </Subtitle2Section>
          </SubtitleSection>

          <SubtitleSection title="2.7 Access to the Website">
            <p>The equipment (computers, telephones, software, telecommunication means, etc.) used to access the Website are the sole responsibility of the User, as are the telecommunication costs incurred by their use.</p>

            <p>When using the Website, the User undertakes to behave in a normal and reasonable manner and not to hinder its proper operation in any way whatsoever.<br />
              In particular, the User undertakes not to:
            </p>
            <ul>
              <li>disrupt, slow down, block or alter the normal flow of data exchanged when using the Website;</li>
              <li>speed up the scrolling of the Website's content in such a way as to modify or alter its operation;</li>
              <li>commit any other action having an equivalent disruptive effect on the functionality of the Website;</li>
              <li>fraudulently access, maintain, hinder or disrupt the Website's access systems.</li>
            </ul>

            <p>It is the User's responsibility to inform us as soon as he/she becomes aware of any "hacking" and in particular of any illicit or non-contractual use of all or part of the Website, whatever the means of distribution used.</p>
          </SubtitleSection>

          <SubtitleSection title="2.8 Hypertext links">
            <p>The website may contain hypertext links to other websites over which Axobot has no control. Although Axobot regularly checks the content of these sites, it accepts no responsibility for it.<br />
              The same applies to any information or page presented by Discord about or in connection with our Service.
            </p>

            <p>Axobot authorizes the creation of hypertext links to any page or document on its website that is directly accessible to the public (with the exception of documents that have been transmitted after submission of a form to Axobot), provided that the creation of these links is not carried out for commercial or advertising purposes and that Axobot has not expressly forbidden the creation of this link.</p>

            <p>Axobot reserves the right to remove any hypertext link to its website at any time if it considers that the link does not comply with its editorial policy.</p>
          </SubtitleSection>
        </TitleSection>


        <TitleSection title="3. License – IP rights">
          <SubtitleSection title="3.1 Software License">
            <p>In consideration for your subscription, the Owner grants you a limited, non-exclusive, non-transferable, non-sublicensable license for the duration of your use of the Axobot Software and its updates (the “<b>License</b>”) in order to use, install and run the Axobot Software licensed hereunder solely for your own purposes.</p>
            <p>You acknowledge and agree that the Axobot Software, including its sequence, structure, organization, and source code, constitutes valuable intellectual property rights, including copyrights, trademarks, service marks, trade secrets, patents, patent applications, contractual rights of confidentiality, or any other intellectual property or exclusive rights, which are owned by the Owner or its suppliers. The Axobot Software is licensed, not sold to you, and no title or ownership of the Axobot Software or any related intellectual property rights are being transferred under the Terms or any other agreement. The Axobot Software shall remain the sole property of the Owner, and all related rights, titles and interests not expressly granted to the User by the Terms is reserved to the Owner.</p>
            <p>Nothing in these Terms shall be deemed to grant, on any basis, a license under any existing or future patents. You acknowledge and agree that in the course of providing the Features, the Owner may create other software and other intellectual works that are wholly owned by the Owner.</p>
            <p>Without prejudice to any more specific provision of these Terms, any intellectual property rights, such as copyrights, trademark rights, patent rights and design rights related to this Website are the exclusive property of the Owner or its licensors and are subject to the protection granted by applicable laws or international treaties relating to intellectual property.</p>
            <p>All trademarks — nominal or figurative — and all other marks, trade names, service marks, word marks, illustrations, images, or logos appearing in connection with this Website are, and remain, the exclusive property of the Owner or its licensors and are subject to the protection granted by applicable laws or international treaties related to intellectual property.</p>
          </SubtitleSection>

          <SubtitleSection title="3.2 Intellectual Property Content on this Website">
            <p>Unless where otherwise specified or clearly recognizable, all content available on this Website is owned or provided by the Owner or its licensors.</p>
            <p>The Owner undertakes its utmost effort to ensure that the content provided on this Website infringes no applicable legal provisions or third-party rights. However, it may not always be possible to achieve such a result.</p>
            <p>In such cases, without prejudice to any legal prerogatives of Users to enforce their rights, Users are kindly asked to preferably report related complaints using the contact details provided in this document.</p>
            <Subtitle2Section title="3.2.1 Rights regarding content on this Website – All rights reserved">
              <p>The Owner holds and reserves all intellectual property rights for any such content. Users may not therefore use such content in any way that is not necessary or implicit in the proper use of the Features.</p>
              <p>In particular, but without limitation, Users may not copy, download, share (beyond the limits set forth below), modify, translate, transform, publish, transmit, sell, sublicense, edit, transfer/assign to third parties or create derivative works from the content available on this Website or through the Features, nor allow any third party to do so through the User or their device, even without the User's knowledge.</p>
              <p>Where explicitly stated on this Website, the User may download, copy and/or share some content available through this Website for its sole personal and non-commercial use and provided that the copyright attributions and all the other attributions requested by the Owner are correctly implemented.</p>
              <p>Any applicable statutory limitation or exception to copyright shall stay unaffected.</p>
            </Subtitle2Section>
            <Subtitle2Section title="3.2.2 Rights regarding content provided by Users">
              <p>Users acknowledge and accept that by providing their own content on this Website they grant the Owner a non-exclusive, fully paid-up and royalty-free license to process such content solely for the operation and maintenance of this Website as contractually required.</p>
              <p>To the extent permitted by applicable law, Users waive any moral rights in connection with content they provide to this Website.</p>
              <p>Users acknowledge, accept and confirm that all content they provide through this Website is provided subject to the same general conditions set forth for content on this Website.</p>
            </Subtitle2Section>
            <Subtitle2Section title="3.2.3 Liability for provided content">
              <p>Users are solely liable for any content they upload, post, share, or provide through this Website. Users acknowledge and accept that the Owner does not filter or moderate such content. However, the Owner reserves the right to remove, delete, block or rectify such content at its own discretion and to, without prior notice, deny the uploading User access to this Website:</p>
              <ul>
                <li>if any complaint based on such content is received;</li>
                <li>if a notice of infringement of intellectual property rights is received;</li>
                <li>upon order of a public authority; or</li>
                <li>where the Owner is made aware that the content, while being accessible via this Website, may represent a risk for Users, third parties and/or the availability of the Service.</li>
              </ul>
              <p>The Owner allows Users to upload, share or provide their own content to this Website.</p>
              <p>By providing content to this Website, Users confirm that they are legally allowed to do so and that they are not infringing any statutory provisions and/or third-party rights.</p>
              <p>The removal, deletion, blocking or rectification of content shall not entitle Users that have provided such content or that are liable for it, to any claims for compensation.</p>
              <p>Users agree to hold the Owner harmless from and against any claim asserted and/or damage suffered due to content they provided to or provided through this Website.</p>
            </Subtitle2Section>
            <Subtitle2Section title="3.2.4 Access to external resources">
              <p>Through this Website Users may have access to external resources provided by third parties. Users acknowledge and accept that the Owner has no control over such resources and is therefore not responsible for their content and availability.</p>
              <p>Conditions applicable to any resources provided by third parties, including those applicable to any possible grant of rights in content, result from each such third parties’ terms and conditions or, in the absence of those, applicable statutory law.</p>
            </Subtitle2Section>
            <Subtitle2Section title="3.2.5 Acceptable use">
              <p>This Website and the Service may only be used within the scope of what they are provided for, under these Terms and applicable law.</p>
              <p>Users are solely responsible for making sure that their use of this Website and/or the Service violates no applicable law, regulations or third-party rights.</p>
              <p>Therefore, the Owner reserves the right to take any appropriate measure to protect its legitimate interests including by denying Users access to this Website or the Service, terminating contracts, reporting any misconduct performed through this Website or the Service to the competent authorities – such as judicial or administrative authorities - whenever Users engage or are suspected to engage in any of the following activities:</p>
              <ul>
                <li>violate laws, regulations and/or these Terms;</li>
                <li>infringe any third-party rights;</li>
                <li>considerably impair the Owner’s legitimate interests;</li>
                <li>ffend the Owner or any third party.</li>
              </ul>
            </Subtitle2Section>
          </SubtitleSection>
        </TitleSection>


        <TitleSection title="4. Disclaimer of Warranties – Liability">
          <SubtitleSection title="4.1 Disclaimer of Warranties – Risks">
            <p>You expressly acknowledge and agree that your use of the Features is at your sole risk. The Features and the access to the Platform are provided on an “as is” and “as available” basis, without warranties of any kind, either express or implied, including, but not limited to, any implied warranty of merchantability, fitness for a particular purpose, or non-infringement of third-party rights.</p>
            <p>No advice or information, whether oral or written, obtained by user from owner or through the Service will create any warranty not expressly stated herein. You acknowledge and expressly agree that we have no control over, and no duty to take any action regarding: which users gain access to or use the Features; what effects the content of the Platform may have on your business or your communities and members; how you may use the content of the Platform and the Features; or what actions you may take, in particular with regard to your communities and/or their members, as a result of having been exposed to the content of the Website.</p>
            <p>We do not warrant that access to the Platform and the Features will be continuous, uninterrupted, timely or secure. You acknowledge and expressly accept that the Website and the Features (a) may contain bugs, errors and defects, (b) may function improperly or be subject to periods of downtime and unavailability, (c) may result in total or partial loss or corruption of data and (d) may be modified at any time, including through the release of subsequent versions, all with or without notice to the User. You acknowledge and expressly agree that the Owner shall in no event be liable for any loss or damage resulting from your failure to comply with your obligations hereunder.</p>
          </SubtitleSection>

          <SubtitleSection title="4.2 Limited Liability">
            <p>You acknowledge and expressly agree that you assume full responsibility for your use of the Website and the Features. You acknowledge and expressly agree that any information you send or receive during your use of the Website and the Features may not be secure and may be intercepted or acquired by unauthorized parties. You acknowledge and expressly agree that your use of the Website and the Features is at your sole risk, and that the Axobot Software may prove to be defective or vulnerable, thus exposing your information systems to the risk of intrusion or corruption. You agree to ensure the security of the systems, programs and data, and you acknowledge that you are solely responsible for the configuration of your computer hardware, programs and platforms used to access the Features. You acknowledge that you are solely responsible for the use of the Features, including any statements or information communicated via the Axobot Software in breach of applicable laws or regulations.</p>
            <p>In particular, you agree not to (a) use the Features for any purpose other than for your own use (b) use or attempt to use the Axobot Software and/or the Features in an offensive, abusive or unlawful manner or purpose, in particular by publishing or using terms that may be offensive or inappropriate; (c) transmit or attempt to transmit copyrighted material without the prior express consent of the copyright owner; (d) use or attempt to use any automated program (including, but not limited to, a robot, spider or other automated means or interface to access the Axobot Software and/or Features); (e) interfere or attempt to interfere with the proper functioning of the Axobot Software and/or Features in a manner that could damage, disable, overload or alter the Axobot Software, in particular, hack or attempt to circumvent any content filtering techniques that the Owner reserves the right to use; (f) copy, modify, merge, sell, redistribute, assign, transfer the software or the source code of the Axobot Software or any part thereof, as well as reverse engineer, decompile, disassemble, translate, decrypt or otherwise attempt to discover the source code used for the Axobot Software; (g) infringe or attempt to infringe any patent, trademark, trade secret, copyright held by the Owner; (h) introduce or attempt to introduce viruses, Trojan horses or other malicious or technologically harmful hardware.</p>
            <p>Finally, you understand and agree that neither the Owner nor its suppliers or licensors shall be liable to you for any indirect damages of any kind, including but not limited to, damages for loss of property, profits, goodwill, use, data or other tangible or any other damages based on contract, tort, or otherwise (even if the Owner has been advised of the possibility of such damages), resulting from: the Website or Features; the use or the inability to use the Website or Axobot Software; unauthorized access to or alteration of your transmissions or data; statements or conduct of any third party on the Website or the Features; any actions we take or fail to take as a result of communications you send to us; human errors; technical malfunctions; failures; omissions, interruptions, latency, deletions or defects of any device or network, providers, or software (including, but not limited to, those that do not permit participation in the Features); any injury or damage to computer equipment; inability to fully access the Website, the Features or any other website; theft, tampering, destruction, or unauthorized access to, images or other content of any kind; data that is processed late or incorrectly or is incomplete or lost; typographical, printing or other errors, or any combination thereof; or any other matter relating to the Website or any other aspect of the Features.</p>
            <p>If despite the above the Owner is found liable by a court for any reason whatsoever, you expressly agree that its aggregate liability will be strictly limited to 50 Euros.</p>
            <p>This limitation of liability section shall apply to the fullest extent permitted by law in the applicable jurisdiction whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, even if company has been advised of the possibility of such damage.</p>
          </SubtitleSection>
        </TitleSection>

        <TitleSection title="5. General Provisions">
          <SubtitleSection title="5.1 Transfer, Assignment or Delegation">
            <p>You expressly agree to indemnify and hold the Owner and third party service providers, and each of their officers, directors, agents, joint venture entities, employees and representatives, harmless from any claim or demand (including attorneys' fees and any fines, fees or penalties imposed by any regulatory authority) arising out of or related to (a) your breach of any of these Terms; (b) your use of the Features; (c) your violation of any law or regulation of any jurisdiction, or the rights of any third party.</p>
            <p>These Terms, and any rights and obligations and the License granted hereunder, are limited, revocable, non-exclusive and personal to you and therefore may not be transferred, assigned or delegated by you to any third-party without our written consent, but may be transferred, assigned or delegated by Axobot without restriction to any third party. Any attempted transfer or assignment in violation hereof shall be null and void.</p>
          </SubtitleSection>

          <SubtitleSection title="5.2 Changes to these Terms">
            <p>The Owner reserves the right to amend or otherwise modify these Terms at any time. In such cases, the Owner will appropriately inform the User of these changes.</p>
            <p>Such changes will only affect the relationship with the User for the future.</p>
            <p>The continued use of the Service will signify the User’s acceptance of the revised Terms. If Users do not wish to be bound by the changes, they must stop using the Features and accessing the Platform. Failure to accept the revised Terms, may entitle either party to terminate the contractual relationship.</p>
            <p>The applicable previous version will govern the relationship prior to the User's acceptance. The User can obtain any previous version from the Owner.</p>
            <p>If required by applicable law, the Owner will specify the date by which the modified Terms will enter into force.</p>
          </SubtitleSection>

          <SubtitleSection title="5.3 Interruption">
            <p>To ensure the best possible service level, the Owner reserves the right to interrupt the access to the Features for maintenance, system updates or any other changes, informing the Users appropriately.</p>
          </SubtitleSection>
        </TitleSection>

        <TitleSection title="6. Governing Law and Submission to Jurisdiction">
          <p>The European Commission has established an online platform for alternative dispute resolutions that facilitates an out-of-court method for solving any dispute related to and stemming from online sale and service contracts.</p>
          <p>As a result, any European Consumer can use such platform for resolving any dispute stemming from contracts which have been entered into online. The platform is available at the following link: <ExternalLink href="https://ec.europa.eu/consumers/odr/main/index.cfm" />.</p>
        </TitleSection>
      </Box>
    </Fragment>
  );
}

export const Component = TOS;

