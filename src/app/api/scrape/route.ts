import type { NextRequest } from "next/server";
import OpenAI from "openai";

const getMdUrl = (url: string) => `https://r.jina.ai/${url}`;

// URL Source: https://news.microsoft.com/source

// Markdown Content:
// Homepage - Source
// ===============

// [Skip to main content](javascript:void(0))

//  [![Image 25](https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31) Microsoft](https://www.microsoft.com/)

// Source

// [Source](https://news.microsoft.com/source)

// Source

// *   [Home](https://news.microsoft.com/source)
// *   Our Company

//     *   [Company News](https://news.microsoft.com/source/topics/company-news/)
//     *   [Official Microsoft Blog](https://blogs.microsoft.com/)
//     *   [Microsoft On The Issues](https://blogs.microsoft.com/on-the-issues/)
//     *   [Europe](https://news.microsoft.com/europe/)
//     *   [Asia](https://news.microsoft.com/apac/)
//     *   [Latin America](https://news.microsoft.com/es-xl/)
//     *   [India](https://news.microsoft.com/en-in/)
//     *   [UK](https://ukstories.microsoft.com/)
//     *   [Inclusion is Innovation](https://news.microsoft.com/inclusionisinnovation)
//     *   [Conexiones](https://blogs.microsoft.com/conexiones/)

// *   [AI](https://news.microsoft.com/source/topics/ai/)
// *   [Innovation](https://news.microsoft.com/source/topics/innovation/)
// *   [Digital Transformation](https://news.microsoft.com/source/topics/digital-transformation/)
// *   [Diversity & Inclusion](https://news.microsoft.com/source/topics/diversity-inclusion/)
// *   [Sustainability](https://news.microsoft.com/source/topics/sustainability/)
// *   [Work & Life](https://news.microsoft.com/source/topics/work-life/)
// *   [Unlocked](https://unlocked.microsoft.com/)
// *   More

// *   All Microsoft

//     *   Global
//         ------

//         *   [Microsoft 365](https://www.microsoft.com/microsoft-365)
//         *   [Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)
//         *   [Copilot](https://copilot.microsoft.com/)
//         *   [Windows](https://www.microsoft.com/en-us/windows/)
//         *   [Surface](https://www.microsoft.com/surface)
//         *   [Xbox](https://www.xbox.com/)
//         *   [Deals](https://www.microsoft.com/en-us/store/b/sale?icid=gm_nav_L0_salepage)
//         *   [Small Business](https://www.microsoft.com/en-us/store/b/business)
//         *   [Support](https://support.microsoft.com/en-us)
//     *   Software Software
//         *   [Windows Apps](https://www.microsoft.com/en-us/store/apps/windows?icid=CNavAppsWindowsApps)
//         *   [AI](https://www.microsoft.com/en-us/ai)
//         *   [Outlook](https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook)
//         *   [OneDrive](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage)
//         *   [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)
//         *   [OneNote](https://www.microsoft.com/en-us/microsoft-365/onenote/digital-note-taking-app)
//         *   [Microsoft Edge](https://www.microsoft.com/edge)
//         *   [Skype](https://www.skype.com/en/)
//     *   PCs & Devices PCs & Devices
//         *   [Computers](https://www.microsoft.com/en-us/store/b/pc?icid=CNavDevicesPC)
//         *   [Shop Xbox](https://www.microsoft.com/en-us/store/b/xbox?icid=CNavDevicesXbox)
//         *   [Accessories](https://www.microsoft.com/en-us/store/b/accessories?icid=CNavDevicesAccessories)
//         *   [VR & mixed reality](https://www.microsoft.com/en-us/store/b/virtualreality?icid=CNavVirtualReality)
//         *   [Certified Refurbished](https://www.microsoft.com/en-us/store/b/certified-refurbished-products)
//         *   [Trade-in for cash](https://www.microsoft.com/en-us/store/b/microsoft-trade-in)
//     *   Entertainment Entertainment
//         *   [Xbox Game Pass Ultimate](https://www.xbox.com/en-us/games/store/xbox-game-pass-ultimate/cfq7ttc0khs0?icid=CNavAllXboxGamePassUltimate)
//         *   [PC Game Pass](https://www.xbox.com/en-us/games/store/pc-game-pass/cfq7ttc0kgq8?icid=CNavAllPCGamePass)
//         *   [Xbox games](https://www.microsoft.com/en-us/store/b/xboxgames?icid=CNavGamesXboxGames)
//         *   [PC and Windows games](https://www.microsoft.com/en-us/store/games/windows?icid=CNavGamesWindowsGames)
//         *   [Movies & TV](https://www.microsoft.com/en-us/store/movies-and-tv?icid=TopNavMoviesTv)
//     *   Business Business
//         *   [Microsoft Cloud](https://www.microsoft.com/en-us/microsoft-cloud)
//         *   [Microsoft Security](https://www.microsoft.com/en-us/security)
//         *   [Dynamics 365](https://www.microsoft.com/en-us/dynamics-365)
//         *   [Microsoft 365 for business](https://www.microsoft.com/en-us/microsoft-365/business)
//         *   [Microsoft Power Platform](https://www.microsoft.com/en-us/power-platform)
//         *   [Windows 365](https://www.microsoft.com/en-us/windows-365)
//         *   [Microsoft Industry](https://www.microsoft.com/en-us/industry)
//         *   [Small Business](https://www.microsoft.com/en-us/store/b/business?icid=CNavBusinessStore)
//     *   Developer & IT Developer & IT
//         *   [Azure](https://azure.microsoft.com/en-us/)
//         *   [Microsoft Developer](https://developer.microsoft.com/en-us/)
//         *   [Documentation](https://learn.microsoft.com/docs/)
//         *   [Microsoft Learn](https://learn.microsoft.com/)
//         *   [Microsoft Tech Community](https://techcommunity.microsoft.com/)
//         *   [Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/)
//         *   [AppSource](https://appsource.microsoft.com/en-us/)
//         *   [Visual Studio](https://visualstudio.microsoft.com/)
//     *   Other Other
//         *   [Microsoft Rewards](https://www.microsoft.com/rewards)
//         *   [Free downloads & security](https://www.microsoft.com/en-us/download)
//         *   [Education](https://www.microsoft.com/en-us/education)
//         *   [Gift cards](https://www.microsoft.com/en-us/store/b/gift-cards)
//         *   [Licensing](https://www.microsoft.com/licensing/)
//         *   [Unlocked stories](https://unlocked.microsoft.com/)
//     *   [View Sitemap](https://www.microsoft.com/en-us/sitemap)

//  Search Search news.microsoft.com/source

// *   No results

// Cancel [0 Cart 0 items in shopping cart](https://www.microsoft.com/en-us/store/cart)

//  [![Image 26](https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31)](https://microsoft.com/)[Source](https://news.microsoft.com/source/)

// *   [](https://www.facebook.com/sharer/sharer.php?u=https://news.microsoft.com/source/ "Share on Facebook")
// *   [](https://www.x.com/share?url=https://news.microsoft.com/source/ "Share on X")
// *   [](https://www.linkedin.com/sharing/share-offsite/?url=https://news.microsoft.com/source/ "Share on LinkedIn")
// *   [](https://www.reddit.com/submit?url=https://news.microsoft.com/source/&title=Homepage "Share on Reddit")
// *   [](https://news.microsoft.com/source/feed/ "Subscribe to RSS")

// Source
// ======

// [![Image 27: Illustration of a boat in water](https://news.microsoft.com/source/wp-content/uploads/2025/01/responsibily-1024x576.jpg)](https://news.microsoft.com/source/features/ai/making-it-easier-for-companies-to-build-and-ship-ai-people-can-trust/)

// *   [Category: AI](https://news.microsoft.com/source/topics/ai/)

// [Making it easier for companies to build and ship AI people can trust](https://news.microsoft.com/source/features/ai/making-it-easier-for-companies-to-build-and-ship-ai-people-can-trust/)
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// [![Image 28: A forest creek flowing over rocks, surrounded by lush greenery.](https://news.microsoft.com/source/wp-content/uploads/2024/12/Forest-creek-1024x558.jpg)](https://news.microsoft.com/source/features/sustainability/3-ways-ai-is-helping-the-planet/)

// *   [Category: Sustainability](https://news.microsoft.com/source/topics/sustainability/)

// [3 ways AI is helping the planet](https://news.microsoft.com/source/features/sustainability/3-ways-ai-is-helping-the-planet/)
// -----------------------------------------------------------------------------------------------------------------------------

// [![Image 29: A girl with a surprised expression (foreground) points at her computer screen, where her desk mate, another girl, is also looking.](https://news.microsoft.com/source/wp-content/uploads/2025/01/WorldTravelerSchool_MSFT960-726x683.jpg)](https://news.microsoft.com/source/emea/features/uniting-the-world-in-the-classroom-how-ai-breaks-barriers-in-a-belgian-school/)

// *   [Category: AI](https://news.microsoft.com/source/topics/ai/)

// [Uniting the world in the classroom: How AI breaks barriers in a Belgian school](https://news.microsoft.com/source/emea/features/uniting-the-world-in-the-classroom-how-ai-breaks-barriers-in-a-belgian-school/)
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// [![Image 30: A person works in a lab](https://news.microsoft.com/source/wp-content/uploads/2025/01/Experimental-validation-modified-1021x683.png)](https://news.microsoft.com/source/features/ai/2-ai-breakthroughs-unlock-new-potential-for-health-and-science/)

// *   [Category: AI](https://news.microsoft.com/source/topics/ai/)

// [2 AI breakthroughs unlock new potential for health and science](https://news.microsoft.com/source/features/ai/2-ai-breakthroughs-unlock-new-potential-for-health-and-science/)
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// [![Image 31: A woman in a greenhouse with rows of plants.](https://news.microsoft.com/source/wp-content/uploads/2025/01/CREA_2_960-726x683.jpg)](https://news.microsoft.com/source/emea/features/decoding-durum-wheat-dna-sustainable-future/)

// *   [Category: Sustainability](https://news.microsoft.com/source/topics/sustainability/)

// [The pasta puzzle: Decoding durum wheat’s DNA for a sustainable future](https://news.microsoft.com/source/emea/features/decoding-durum-wheat-dna-sustainable-future/)
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Latest News
// -----------

// 1.  *   [Category: Company News](https://news.microsoft.com/source/topics/company-news/)

//     [![Image 32: Developer Direct text along with title art from four games and the Xbox logo](https://news.microsoft.com/source/wp-content/uploads/2025/01/Recap-a462b3f7d234f5dc397d-1536x864-1-765x720.jpg)](https://news.xbox.com/en-us/2025/01/23/xbox-developer-direct-2025-recap/)

//     ### [Everything we announced at Xbox Developer\_Direct 2025](https://news.xbox.com/en-us/2025/01/23/xbox-developer-direct-2025-recap/)

// 2.  *   [Category: Company News](https://news.microsoft.com/source/topics/company-news/)

//     [![Image 33: Circles with space and nature images](https://news.microsoft.com/source/wp-content/uploads/2025/01/Coldplay_WithLogo_AzureBlog-1-1536x864-1-768x720.jpg)](https://azure.microsoft.com/en-us/blog/coldplay-evolves-the-fan-experience-with-microsoft-ai/)

//     ### [Coldplay evolves the fan experience with Microsoft AI](https://azure.microsoft.com/en-us/blog/coldplay-evolves-the-fan-experience-with-microsoft-ai/)

// 3.  *   [Category: Company News](https://news.microsoft.com/source/topics/company-news/)

//     [![Image 34: Text reading Xbox Excellence Awards](https://news.microsoft.com/source/wp-content/uploads/2025/01/XEA_Blogpost1920x1080-d2e8d1936ee70fd1c58c-1536x864-1-765x720.jpg)](https://news.xbox.com/en-us/2025/01/24/xbox-excellence-awards/)

//     ### [Find out which games won 2024 Xbox Excellence Awards](https://news.xbox.com/en-us/2025/01/24/xbox-excellence-awards/)

// 4.  *   [Category: Company News](https://news.microsoft.com/source/topics/company-news/)

//     [![Image 35: Skyscrapers against a sunset sky](https://news.microsoft.com/source/wp-content/uploads/2025/01/MSC22_Getty_UK_Finance_960-765x720.jpg)](https://www.microsoft.com/en-us/industry/blog/financial-services/2025/01/23/5-ways-that-ai-modernization-is-transforming-trade-financing/)

//     ### [5 ways that AI modernization is transforming trade financing](https://www.microsoft.com/en-us/industry/blog/financial-services/2025/01/23/5-ways-that-ai-modernization-is-transforming-trade-financing/)

// [View all](https://news.microsoft.com/source/view-all/)

// Press Tools
// -----------

// *   [Follow our top news](https://www.linkedin.com/showcase/microsoft-news-and-stories/posts/?feedView=all)
// *   [Press releases](https://news.microsoft.com/category/press-releases/)
// *   [Facts about Microsoft](https://news.microsoft.com/facts-about-microsoft/)
// *   [Chairman and CEO](https://news.microsoft.com/exec/satya-nadella/)
// *   [Executive biographies](https://news.microsoft.com/leadership/)
// *   [Events](https://news.microsoft.com/microsoft-events/)
// *   [Speeches](https://news.microsoft.com/speeches/)
// *   [Image gallery](https://news.microsoft.com/imagegallery/)
// *   [Video & b-roll](https://news.microsoft.com/videos/)
// *   [Press contacts](https://news.microsoft.com/microsoft-public-relations-contacts/)
// *   [Investor Relations](http://www.microsoft.com/investor/default.aspx)

// The Monthly Tech-In: Your source of “byte-sized” updates on Microsoft innovations and global tech

// [Subscribe here](https://www.linkedin.com/newsletters/the-monthly-tech-in-7056663228474425344)

// More from AI
// ------------

// [View all](https://news.microsoft.com/source/topics/ai/)

// [![Image 36: Abstract artwork featuring vertical black and white striped patterns with a curved line intersecting them. The composition is framed by bold red and blue borders, set against a dark background with purple textured elements.](https://news.microsoft.com/source/wp-content/uploads/2024/12/jailbreaking-nogradient-768x432.jpg)](https://news.microsoft.com/source/features/ai/safeguarding-ai-against-jailbreaks-and-other-prompt-attacks/)

// *   [Category: AI](https://news.microsoft.com/source/topics/ai/)

// ### [Safeguarding AI against ‘jailbreaks’ and other prompt attacks](https://news.microsoft.com/source/features/ai/safeguarding-ai-against-jailbreaks-and-other-prompt-attacks/)

// [![Image 37: Line drawing of a magnifying glass, hand with wrench, lock with key and illuminated light bulb against a colorful background.](https://news.microsoft.com/source/wp-content/uploads/2024/11/AI-agents-hero-768x430.png)](https://news.microsoft.com/source/features/ai/ai-agents-what-they-are-and-how-theyll-change-the-way-we-work/)

// *   [Category: AI](https://news.microsoft.com/source/topics/ai/)

// ### [AI agents — what they are, and how they’ll change the way we work](https://news.microsoft.com/source/features/ai/ai-agents-what-they-are-and-how-theyll-change-the-way-we-work/)

// [![Image 38: A vibrant illustration of a person joyfully raising their hands against a purple background, surrounded by AI-related elements including a brain, robotic arms, a laptop, a server, and a magnifying glass. The letters 'AI' are prominently displayed, with abstract shapes and symbols scattered throughout the design.](https://news.microsoft.com/source/wp-content/uploads/2024/12/ai-updated-768x432.jpg)](https://news.microsoft.com/source/features/ai/6-ai-trends-youll-see-more-of-in-2025/)

// *   [Category: AI](https://news.microsoft.com/source/topics/ai/)

// ### [6 AI trends you’ll see more of in 2025](https://news.microsoft.com/source/features/ai/6-ai-trends-youll-see-more-of-in-2025/)

// [View all](https://news.microsoft.com/source/topics/ai/)

// More from Work & Life
// ---------------------

// [View all](https://news.microsoft.com/source/topics/work-life/)

// [![Image 39: Mats Steen in a wheelchair smiling at camera](https://news.microsoft.com/source/wp-content/uploads/2024/12/Ibelin_00_48_25_20-768x577.jpg)](https://news.microsoft.com/source/features/work-life/his-own-body-weakened-by-rare-disease-gamer-adopts-stronger-one-leaves-legacy-within-world-of-warcraft/)

// *   [Category: Work & Life](https://news.microsoft.com/source/topics/work-life/)

// ### [His own body weakened by a rare disease, a gamer adopts a stronger one – and leaves a legacy – within World of Warcraft](https://news.microsoft.com/source/features/work-life/his-own-body-weakened-by-rare-disease-gamer-adopts-stronger-one-leaves-legacy-within-world-of-warcraft/)

// [![Image 40: A collage featuring seven individuals in a grid pattern, each framed against a blue and patterned background.](https://news.microsoft.com/source/wp-content/uploads/2024/11/MS_Copilot_1920x1080-update-768x432.jpg)](https://news.microsoft.com/source/features/ai/workers-in-all-kinds-of-roles-and-industries-count-on-copilot-to-do-more-in-less-time/)

// *   [Category: AI](https://news.microsoft.com/source/topics/ai/)

// ### [Workers in all kinds of roles and industries count on Copilot to do more — in less time](https://news.microsoft.com/source/features/ai/workers-in-all-kinds-of-roles-and-industries-count-on-copilot-to-do-more-in-less-time/)

// [![Image 41: Man in uniform looking out an airplane window, holding a camera](https://news.microsoft.com/source/wp-content/uploads/2024/11/11-Brandon-Yaeger-768x432.jpg)](https://news.microsoft.com/source/features/work-life/as-real-as-it-gets-pilots-lend-their-expertise-to-the-most-authentic-flight-sim-on-the-market/)

// *   [Category: Work & Life](https://news.microsoft.com/source/topics/work-life/)

// ### [As real as it gets: Pilots lend their expertise to the most authentic flight sim on the market](https://news.microsoft.com/source/features/work-life/as-real-as-it-gets-pilots-lend-their-expertise-to-the-most-authentic-flight-sim-on-the-market/)

// [View all](https://news.microsoft.com/source/topics/work-life/)

// More from Digital Transformation
// --------------------------------

// [View all](https://news.microsoft.com/source/topics/digital-transformation/)

// [![Image 42: Runners race on a track at the 2023 Special Olympics World Games in Berlin.](https://pub-66c8c8c5ae474e9a9161c92b21de2f08.r2.dev/2024/07/AHI_ATHLETICS_200623_020_CROPPED-768x382.jpg)](https://news.microsoft.com/source/features/digital-transformation/special-olympics-racing-toward-tech-evolution-athletes-leading-sprint/)

// *   [Category: Digital Transformation](https://news.microsoft.com/source/topics/digital-transformation/)

// ### [Special Olympics is racing toward a tech evolution. The athletes are leading the sprint](https://news.microsoft.com/source/features/digital-transformation/special-olympics-racing-toward-tech-evolution-athletes-leading-sprint/)

// [![Image 43: Photo of Delvin Holman and Kerrie Davis, two Lumen Technologies marketing employees, conferring at a table with a computer.](https://pub-66c8c8c5ae474e9a9161c92b21de2f08.r2.dev/2024/07/XR1009-128282-Lumen-Modern-Work-v10_01_GS_still-2-768x364.jpg)](https://news.microsoft.com/source/features/digital-transformation/the-only-way-how-copilot-is-helping-propel-an-evolution-at-lumen-technologies/)

// *   [Category: Digital Transformation](https://news.microsoft.com/source/topics/digital-transformation/)

// ### [‘The only way’: How Copilot is helping propel an evolution at Lumen Technologies](https://news.microsoft.com/source/features/digital-transformation/the-only-way-how-copilot-is-helping-propel-an-evolution-at-lumen-technologies/)

// [![Image 44: A staff member helps a patron at the Koelbel Library Technology Help desk](https://news.microsoft.com/source/wp-content/uploads/2024/12/A-staff-member-helps-a-patron-at-the-Koelbel-Library-Technology-Help-desk-768x548.jpeg)](https://news.microsoft.com/source/features/digital-transformation/with-new-digital-technology-and-services-arapahoe-libraries-creates-the-library-of-the-future-for-communities-in-colorado/)

// *   [Category: Digital Transformation](https://news.microsoft.com/source/topics/digital-transformation/)

// ### [With new digital technology and services, Arapahoe Libraries creates the ‘library of the future’ for communities in Colorado](https://news.microsoft.com/source/features/digital-transformation/with-new-digital-technology-and-services-arapahoe-libraries-creates-the-library-of-the-future-for-communities-in-colorado/)

// [View all](https://news.microsoft.com/source/topics/digital-transformation/)

// More from Sustainability
// ------------------------

// [View all](https://news.microsoft.com/source/topics/sustainability/)

// [![Image 45: A male scientist assembles a coin cell by hand, using tweezers to drop in the synthesized solid electrolyte.](https://pub-66c8c8c5ae474e9a9161c92b21de2f08.r2.dev/2024/01/AI-and-HPC-computing-speeding-up-scientific-discovery-hero-768x1024.jpg)](https://news.microsoft.com/source/features/ai/how-ai-and-hpc-are-speeding-up-scientific-discovery/)

// *   [Category: AI](https://news.microsoft.com/source/topics/ai/)

// ### [Discoveries in weeks, not years: How AI and high-performance computing are speeding up scientific discovery](https://news.microsoft.com/source/features/ai/how-ai-and-hpc-are-speeding-up-scientific-discovery/)

// [![Image 46: A closeup of a hand holding a blue FIDO sensor, with an elastic band for attaching it to pipes.](https://news.microsoft.com/source/wp-content/uploads/2024/09/AI-tool-uses-sound-to-pinpoint-leaky-pipes-Hero-768x512.jpg)](https://news.microsoft.com/source/features/sustainability/ai-tool-uses-sound-to-pinpoint-leaky-pipes-saving-precious-drinking-water/)

// *   [Category: Sustainability](https://news.microsoft.com/source/topics/sustainability/)

// ### [AI tool uses sound to pinpoint leaky pipes, saving precious drinking water](https://news.microsoft.com/source/features/sustainability/ai-tool-uses-sound-to-pinpoint-leaky-pipes-saving-precious-drinking-water/)

// [![Image 47: Rendering of the completed datacenter engineered to reduce the need for steel and concrete by using wood in the floors.](https://news.microsoft.com/source/wp-content/uploads/2024/10/Microsoft-builds-first-datacenters-with-hero-still-768x458.png)](https://news.microsoft.com/source/features/sustainability/microsoft-builds-first-datacenters-with-wood-to-slash-carbon-emissions/)

// *   [Category: Sustainability](https://news.microsoft.com/source/topics/sustainability/)

// ### [Microsoft builds first datacenters with wood to slash carbon emissions](https://news.microsoft.com/source/features/sustainability/microsoft-builds-first-datacenters-with-wood-to-slash-carbon-emissions/)

// [View all](https://news.microsoft.com/source/topics/sustainability/)

// What's new

// *   [Surface Pro](https://www.microsoft.com/en-us/surface/devices/surface-pro-11th-edition)
// *   [Surface Laptop](https://www.microsoft.com/en-us/surface/devices/surface-laptop-7th-edition)
// *   [Surface Laptop Studio 2](https://www.microsoft.com/en-us/d/Surface-Laptop-Studio-2/8rqr54krf1dz)
// *   [Surface Laptop Go 3](https://www.microsoft.com/en-us/d/Surface-Laptop-Go-3/8p0wwgj6c6l2)
// *   [Microsoft Copilot](https://www.microsoft.com/en-us/microsoft-copilot)
// *   [AI in Windows](https://www.microsoft.com/en-us/windows/copilot-ai-features)
// *   [Explore Microsoft products](https://www.microsoft.com/en-us/microsoft-products-and-apps)
// *   [Windows 11 apps](https://www.microsoft.com/windows/windows-11-apps)

// Microsoft Store

// *   [Account profile](https://account.microsoft.com/)
// *   [Download Center](https://www.microsoft.com/en-us/download)
// *   [Microsoft Store support](https://go.microsoft.com/fwlink/?linkid=2139749)
// *   [Returns](https://www.microsoft.com/en-us/store/b/returns)
// *   [Order tracking](https://www.microsoft.com/en-us/store/b/order-tracking)
// *   [Certified Refurbished](https://www.microsoft.com/en-us/store/b/certified-refurbished-products)
// *   [Microsoft Store Promise](https://www.microsoft.com/en-us/store/b/why-microsoft-store?icid=footer_why-msft-store_7102020)
// *   [Flexible Payments](https://www.microsoft.com/en-us/store/b/payment-financing-options?icid=footer_financing_vcc)

// Education

// *   [Microsoft in education](https://www.microsoft.com/en-us/education)
// *   [Devices for education](https://www.microsoft.com/en-us/education/devices/overview)
// *   [Microsoft Teams for Education](https://www.microsoft.com/en-us/education/products/teams)
// *   [Microsoft 365 Education](https://www.microsoft.com/en-us/education/products/microsoft-365)
// *   [How to buy for your school](https://www.microsoft.com/education/how-to-buy)
// *   [Educator training and development](https://education.microsoft.com/)
// *   [Deals for students and parents](https://www.microsoft.com/en-us/store/b/education)
// *   [Azure for students](https://azure.microsoft.com/en-us/free/students/)

// Business

// *   [Microsoft Cloud](https://www.microsoft.com/en-us/microsoft-cloud)
// *   [Microsoft Security](https://www.microsoft.com/en-us/security)
// *   [Dynamics 365](https://www.microsoft.com/en-us/dynamics-365)
// *   [Microsoft 365](https://www.microsoft.com/en-us/microsoft-365/business)
// *   [Microsoft Power Platform](https://www.microsoft.com/en-us/power-platform)
// *   [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)
// *   [Microsoft 365 Copilot](https://www.microsoft.com/en-us/microsoft-365/copilot/copilot-for-work)
// *   [Small Business](https://www.microsoft.com/en-us/store/b/business?icid=CNavBusinessStore)

// Developer & IT

// *   [Azure](https://azure.microsoft.com/en-us/)
// *   [Microsoft Developer](https://developer.microsoft.com/en-us/)
// *   [Documentation](https://learn.microsoft.com/docs/)
// *   [Microsoft Learn](https://learn.microsoft.com/)
// *   [Microsoft Tech Community](https://techcommunity.microsoft.com/)
// *   [Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/)
// *   [AppSource](https://appsource.microsoft.com/en-us/)
// *   [Visual Studio](https://visualstudio.microsoft.com/)

// Company

// *   [Careers](https://careers.microsoft.com/)
// *   [About Microsoft](https://www.microsoft.com/about)
// *   [Company news](https://news.microsoft.com/)
// *   [Privacy at Microsoft](https://privacy.microsoft.com/en-us)
// *   [Investors](https://www.microsoft.com/investor/default.aspx)
// *   [Diversity and inclusion](https://www.microsoft.com/en-us/diversity/)
// *   [Accessibility](https://www.microsoft.com/en-us/accessibility)
// *   [Sustainability](https://www.microsoft.com/en-us/sustainability/)

// [English (United States)](https://www.microsoft.com/en-us/locale) [Your Privacy Choices](https://aka.ms/yourcaliforniaprivacychoices)[Consumer Health Privacy](https://go.microsoft.com/fwlink/?linkid=2259814)

// *   [Sitemap](https://www.microsoft.com/en-us/sitemap1.aspx)
// *   [Contact Microsoft](https://support.microsoft.com/contactus)
// *   [Privacy](https://go.microsoft.com/fwlink/?LinkId=521839)
// *   [Manage cookies](https://news.microsoft.com/source#)
// *   [Terms of use](https://go.microsoft.com/fwlink/?LinkID=206977)
// *   [Trademarks](https://go.microsoft.com/fwlink/?linkid=2196228)
// *   [Safety & eco](https://go.microsoft.com/fwlink/?linkid=2196227)
// *   [Recycling](https://www.microsoft.com/en-us/legal/compliance/recycling)
// *   [About our ads](https://choice.microsoft.com/)
// *   © Microsoft 2025

// ![Image 48](https://bat.bing.com/action/0?ti=355022723&tm=gtm002&Ver=2&mid=d3cd7b88-c330-4b13-ae8d-2c1bc03dbb5a&bo=1&sid=b57ea900dca511ef8e0103f6db388e1d&vid=b57ec3c0dca511efad0929d37f2347ac&vids=1&msclkid=N&uach=pv%3D10.0&pi=918639831&lg=en-US&sw=800&sh=600&sc=24&tl=Homepage%20-%20Source&p=https%3A%2F%2Fnews.microsoft.com%2Fsource&r=&lt=8835&evt=pageLoad&sv=1&cdb=AQAQ&rn=540617)`;

const getNewsArticleUrls = async (md: string) => {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "I will provide you with data about a collection of walks. Included in this data are the individual walks. Return information about these individual walks.",
      },
      {
        role: "user",
        content: md,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "walks",
        strict: true,
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description:
                "The name of the trail that the walks are part of. For example, 'Millenium Way' or 'The Cotswold Way'",
            },
            summary: {
              type: "string",
              description:
                "A 75 word summary of the walk collection using language that is matter of fact but slightly fun that would entice the reader to want to complete the walks. Use the trail name in the summary.",
            },
            walks: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  number: {
                    type: "number",
                    description: "The number of the walk, starting with 1",
                  },
                  name: {
                    type: "string",
                    description: "The name of the walk",
                  },
                  url: {
                    type: "string",
                    description: "The URL of the indiviudal walk",
                  },
                },

                required: ["number", "name", "url"],
                additionalProperties: false,
              },
            },
          },
          required: ["name", "summary", "walks"],
          additionalProperties: false,
        },
      },
    },
  });

  return response;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return new Response("url is required", { status: 400 });
  }

  const mdUrl = getMdUrl(url);
  const mdRes = await fetch(mdUrl);
  const md = await mdRes.text();

  const res = await getNewsArticleUrls(md);
  // const json = await res.json();

  // if (json?.error) {
  //   return Response.json(json.error);
  // }

  // const content = JSON.parse(json.choices[0].message.content);
  return Response.json(JSON.parse(res.choices[0]?.message?.content));
}
