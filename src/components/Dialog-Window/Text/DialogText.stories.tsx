import { Meta, StoryObj } from '@storybook/react';
import { DialogText } from './DialogText';

export default {
  title: 'molecules/Dialog Content/Dialog Text',
  component: DialogText,
} satisfies Meta<typeof DialogText>;

type Story = StoryObj<typeof DialogText>;

export const SimpleText: Story = {
  args: {
    topicImage: {
      path: 'https://images.unsplash.com/photo-1557657043-23eec69b89c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80',
      alt: 'White seal on soil',
      copyright: {
        author: 'Amy Asher',
        license: 'Unsplash License',
        source: 'https://unsplash.com/photos/giZJHm2m9yY',
        title: 'White seal on soil',
        version: '1',
        year: '2019',
      },
    },
    introduction: `Den franske revolusjon var en periode med store sosiale og politiske
    omveltningene i Frankrike i perioden 1789-1799. Året 1789 markerer det
    første viktige vendepunktet under revolusjonen. 14. juli dette året brøt
    det ut masseopprør i Paris og fengselet Bastillen ble stormet.`,

    bodyText: `<p> Perioden 1787-1789 kalles gjerne førrevolusjonen, men langsiktige
    årsaker til revolusjonen strekker seg naturligvis mye lenger tilbake i
    tid. De viktigste politiske, sosiale og administrative omveltninger
    skjedde i perioden 1789-1794. <p>`,
  },
};
