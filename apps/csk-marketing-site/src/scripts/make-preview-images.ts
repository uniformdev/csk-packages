import puppeteer from 'puppeteer';

const PREVIEWS: Record<
  string,
  { id: string; width?: number; height: number; scale?: number; fullWidth?: boolean; onlyTitle?: boolean }
> = {
  'tabs-bordered': { id: '6333a47f-6fdf-4e3c-a131-9e5ea394279a', height: 107 },
  'testimonial-default-variant': { id: '4a8a7a31-8425-4dee-bc8a-ba0adce84cb1', height: 304 },
  'table-default-variant': { id: '2f13cf78-8979-473d-a90a-a4d8cf6309d6', height: 164 },
  'modal-with-action-buttons': { id: '1133c76a-1536-4600-9890-e244bc514881', height: 36, onlyTitle: true },
  video: { id: '8a4cee22-10f6-42ce-a75f-ea41d37e8ef1', height: 503 },
  'modal-default': { id: 'b9f6cc2c-2589-4e05-b357-aef0eb361926', height: 36, onlyTitle: true },
  'banner-floating-top': { id: 'a706130e-a936-4249-bb52-672f0b695f97', height: 120 },
  'header-with-groups': { id: '0258bd90-4bcb-40a6-82a7-ba54d340f6b2', height: 84 },
  'link-with-image': { id: 'b0bb44d6-58cd-41a1-9578-8dcb030db8bd', height: 50, onlyTitle: true },
  'container-fluid': { id: 'b16750d7-9e9f-46aa-a9be-714c27622b12', height: 96, onlyTitle: true },
  'countdown-with-big-size': { id: 'a47df705-5cf1-4d2a-99c6-a6ece12a1349', height: 92 },
  'rich-text': { id: 'c6a06a42-69ae-46f8-8c24-cdab79bbb42a', height: 544 },
  'container-full-height': { id: '7fc164e9-d0bf-4400-92e7-f23665c7a299', height: 250, onlyTitle: true },
  'container-default': { id: '36338c2f-e120-4a5a-a7aa-8c45405a2a6c', height: 192, onlyTitle: true },
  'spacer-horizontal': { id: '3e4272be-c205-473a-ae4a-8d377cf771a9', height: 72 },
  'accordion-item': { id: '7f862a6a-891a-41d8-bdd6-c6080fec25d0', height: 72, fullWidth: true, onlyTitle: true },
  accordion: { id: 'a691349f-8982-4bbb-92c1-5f00ce1ec4a8', height: 400, fullWidth: true },
  'grid-item': { id: '996082b8-10d2-486a-ab27-c5b8bf3cd9b5', height: 48, onlyTitle: true },
  'icon-label': { id: '1a00124f-dcd4-4bb4-be1c-719fe05473a4', height: 24 },
  'header-with-flyout': { id: 'fc717d20-29a6-4368-9923-ac678c19b92e', height: 84 },
  'header-with-links': { id: '88a1aaac-18b3-46a3-bb04-ae0e40679f5f', height: 84 },
  'header-default': { id: 'dafbe98a-49b2-4f33-a7d9-e71f9a1fdb35', height: 84 },
  image: { id: 'bb360080-cd4d-409d-9257-97147c48ec9c', height: 500 },
  'link-with-text': { id: 'f0d35957-ec8b-49a2-b595-474d7e24fe73', height: 24, onlyTitle: true },
  spacer: { id: '9569b4fd-a6fc-4144-93f2-7dd0944dff67', height: 154 },
  footer: { id: 'd47703a2-4685-41a0-907e-8324a052640b', height: 312 },
  'flex-item': { id: 'c1a440d7-0426-44a7-9930-d0472e1a22c8', height: 48, onlyTitle: true },
  divider: { id: '23709733-eada-4283-9f82-f82ea2df8966', height: 8 },
  'container-with-spacing': { id: '0816597e-0597-44ac-bcf0-aa8175a14bb5', height: 180, onlyTitle: true },
  'theme-switcher': { id: 'bb38250d-3d3f-4f1d-9ac6-fafa373b78a2', height: 28, onlyTitle: true },
  'banner-default': { id: '7483194c-700d-4295-b326-7e1bbe761525', height: 120 },
  'card-default': { id: 'd20d8ec4-ef37-4886-bb6f-9784057f8d9e', height: 434 },
  'card-with-background-image': { id: 'ba89404c-71eb-4690-b3a8-de4260b19239', height: 244 },
  'breadcrumbs-slash': { id: '798bf17e-82d3-4c3e-8cc0-1bdfd1335941', height: 24 },
  'breadcrumbs-chevron': { id: '7920299d-4f5a-4f15-bd99-f97c2328b9de', height: 24 },
  flex: { id: 'a1e3cc5d-b658-46b8-b11e-f47585651829', height: 48 },
  grid: { id: '9d131ecf-15f2-4b19-9957-a0cae0d2d8c3', height: 160 },
  'banner-floating-bottom': { id: '38b61ec8-f582-42c7-a212-fda3ed6cef5d', height: 120 },
  'button-with-icon': { id: '0ec7eef9-437d-4fb4-87d9-31548231d5f9', width: 298, height: 44, scale: 3 },
  text: { id: 'd1ff4df1-0ada-4137-841d-353e5c7bb7cc', height: 48, onlyTitle: true },
  'carousel-with-media': { id: '5c031b6d-ce86-468c-8c95-acbdf4b23279', height: 500 },
  'button-secondary': { id: '0c5ba054-c2d2-4c2b-adbf-1c99be2aec4c', width: 298, height: 44, scale: 3 },
  'button-tertiary': { id: '81a51384-1ef7-4557-b5b9-9eb0dc62df65', width: 298, height: 44, scale: 3 },
  'button-link': { id: '13db9b15-45e0-4a33-bbb2-651d151625b0', width: 298, height: 44, scale: 3 },
  button: { id: 'e52c8d07-7d80-4b35-aed0-7e1cbfed3404', width: 298, height: 44, scale: 3 },
  'table-variant-with-custom-cells': { id: 'c3de820e-ca91-4a13-81e5-bcb55c845d90', height: 212 },
  'section-default-variant-with-image': { id: 'c83614e9-1a4c-41b6-9a16-9b07cc341d07', width: 1025, height: 252 },
  'section-columns-variant-with-image': { id: '7f0d0a65-02dd-4291-8b81-fb13ae23a48d', width: 1025, height: 463 },
  'review-multi-column-variant': { id: 'f9a92fbf-51cc-4385-b06a-73087f151463', height: 204 },
  'countdown-with-background': { id: 'f46eb07e-912a-488e-9c2f-737e4de70cb1', height: 52 },
  'testimonial-with-large-avatar-variant': { id: 'ec3d2ee4-f077-4158-aab0-4c3c5bf5cf81', height: 304 },
  'tabs-default': { id: 'dadf32a7-67e6-4e98-839d-d37875919fbf', height: 104 },
  'review-default-variant': { id: 'db9c43cb-1bc0-43a1-bfd0-96b6aca664d3', height: 264 },
  'badge-large': { id: 'd0bea69d-2b93-4ee1-a56b-36cf0c5d9f5d', height: 26 },
  'image-gallery': { id: 'babf6b52-44eb-4d3f-8838-0d4e1b21d4f4', height: 745 },
  'testimonial-with-overlapping-image-variant': {
    id: 'b6b1a64a-063d-4e60-974d-f1c083ddd8dd',
    width: 1025,
    height: 440,
  },
  'countdown-labels-under-variant': { id: 'c826d4bc-909c-4895-96ca-1f814cf822a9', height: 68 },
  'badge-small': { id: '7f60f663-e5c4-4086-9f86-032fa8321379', height: 24 },
  'section-columns-reverse-variant-with-image': {
    id: 'ad31c0d5-4901-4f2c-a973-409ef0fb493e',
    width: 1025,
    height: 415,
  },
  'section-default-variant-with-video': { id: 'ad0db3d1-667d-455c-acd9-9bad773b2dfc', width: 1025, height: 252 },
  'countdown-default': { id: 'a0eb6eff-2df1-4054-bd44-f50bd4a8745d', height: 52 },
  tab: {
    id: 'd1787a02-0366-4bf0-822f-061416f10ae8',
    onlyTitle: true,
    height: 104,
  },
  page: { id: '5a3ce248-ff09-4f40-9c0c-c6f0d9f7d8ca', height: 48, onlyTitle: true },
  'navigation-link': { id: 'f96d224a-4859-4ca8-8608-9a4262d17b6d', height: 48, onlyTitle: true },
  'navigation-group': { id: 'a6f02335-6d9b-4195-b08f-492104503539', height: 48, onlyTitle: true },
  hero: { id: 'c9ef6695-6e92-4869-a538-021b80f8a335', width: 1025, height: 252 },
  'hero-fixed': { id: '06c829bb-f1ef-4cec-95b5-9607b7af2408', width: 1025, height: 463 },
  'hero-flexible': { id: '18f7ed29-20d5-4407-94a8-409154091dc2', width: 1025, height: 463 },
  'featured-card': { id: '07d21791-b162-45ec-9197-09a577defd3b', width: 447, height: 250, scale: 2 },
  'feature-item': { id: 'c89210b7-c20c-453f-a22b-4a4794f30df5', width: 447, height: 250, scale: 2 },
  'stat-item': { id: '38dbf8fd-9322-4f39-8c30-8a1e57ff99d9', width: 447, height: 250, scale: 2 },
  'stat-item-with-background': { id: '8584c475-ed47-4dfc-9cbb-dc35c49e0914', width: 447, height: 250, scale: 2 },
  'table-row': { id: '8f91d487-033b-4291-8587-f6b9ba782756', height: 48, onlyTitle: true },
  'table-header-cell': { id: 'c45407b4-4856-414a-9c46-1c2ac6345a90', height: 48, onlyTitle: true },
  'navigation-flyout': { id: 'c61478a3-a174-44e1-81ba-42a3188436f4', height: 48, onlyTitle: true },
  'table-data-cell': { id: '00b39ce3-f591-44ca-b287-ea5193fdd182', height: 48, onlyTitle: true },
  'table-custom-cell': { id: 'f8d807a7-b0af-4067-ac05-a384046e02fc', height: 48, onlyTitle: true },
};

const WITH_DELAY: string[] = ['video', 'section-default-variant-with-video'];
const DELAY_TIME = 5000;
const DEFAULT_WIDTH = 894;
const DEFAULT_SCALE = 1;
const HEIGHT_OFFSET = 32;
const HEIGHT_FOR_ONLY_TITLE = 168;
const DOMAIN = 'http://localhost:3000';
const FOR_CANVAS_PREVIEW = true;

const PATH = FOR_CANVAS_PREVIEW ? './public/canvas-preview-images' : './public/preview-images';

// Helper function for adding delay
const delay = (time: number): Promise<void> => new Promise(resolve => setTimeout(resolve, time));

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    for await (const [componentName, data] of Object.entries(PREVIEWS)) {
      const SIZE = {
        width: data.width || DEFAULT_WIDTH,
        height: data.onlyTitle ? HEIGHT_FOR_ONLY_TITLE : data.height + HEIGHT_OFFSET,
        deviceScaleFactor: data.scale || DEFAULT_SCALE,
      };
      await page.setViewport(SIZE);
      const baseURL = `${DOMAIN}/preview-image?id=${data.id}${data.fullWidth ? '&fullWidth=true' : ''}${data.onlyTitle ? '&onlyTitle=true' : ''}${FOR_CANVAS_PREVIEW ? '&canvas=true' : ''}`;

      const saveScreenshot = async (theme: string = 'light'): Promise<void> => {
        const filePath = FOR_CANVAS_PREVIEW ? `${PATH}/${componentName}.jpeg` : `${PATH}/${theme}/${data.id}.jpeg`;
        await page.screenshot({ path: filePath, type: 'jpeg', quality: 100 });
      };

      console.info(`Capturing screenshot for ${componentName}...`);

      // Navigate to base URL and capture screenshot for light theme
      await page.goto(baseURL);

      if (WITH_DELAY.includes(componentName)) await delay(DELAY_TIME);

      await saveScreenshot();

      if (!FOR_CANVAS_PREVIEW) {
        // Navigate to base URL and capture screenshot for light theme
        await page.goto(`${baseURL}&theme=dark`);

        if (WITH_DELAY.includes(componentName)) await delay(DELAY_TIME);

        await saveScreenshot('dark');
      }
    }
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
})();
