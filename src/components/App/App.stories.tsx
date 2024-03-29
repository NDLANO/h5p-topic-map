import { Meta, StoryObj } from '@storybook/react';
import { ArrowType } from '../../types/ArrowType';
import { ColorTheme } from '../../types/ColorTheme';
import { defaultTranslations } from '../../constants/defaultTranslations';
import { App } from './App';

export default {
  title: 'Pages/App',
  component: App,
} satisfies Meta<typeof App>;

type Story = StoryObj<typeof App>;

export const DenFranskeRevolusjon: Story = {
  args: {
    params: {
      l10n: defaultTranslations,
      topicMap: {
        grid: {
          numberOfColumns: 31,
          numberOfRows: 19,
        },
        topicMapItems: [
          {
            id: '23bc191f-3b67-424b-aeee-b1706bd2b66f',
            xPercentagePosition: 0,
            yPercentagePosition: 21.202682436633363,
            widthPercentage: 12.903225806451612,
            heightPercentage: 15.78947368421052,
            label: 'Den amerikanske revolusjonen',
            description: '',
            dialog: {
              hasNote: true,
              text: '',
              showAddLinks: false,
            },
            topicImage: {
              path: 'https://statisk.ndla.no/historie/tankekart/den_franske_revolusjon/img/07_02_bunkerhill.jpg',
              mime: 'image/jpeg',
              copyright: {
                license: 'PD',
                title: 'Slaget på Bunker Hill',
                author: 'E. Percy Morgan',
                version: 'CC0 1.0',
              },
              width: 656,
              height: 500,
            },
          },
          {
            id: 'aa0ca5fc-237a-4237-9fd1-e8e8d4111254',
            xPercentagePosition: 0,
            yPercentagePosition: 42.40536487326673,
            widthPercentage: 12.903225806451612,
            heightPercentage: 15.789473684210527,
            label: 'Stendersamfunnet',
            description: '',
            dialog: {
              hasNote: true,
              audio: {
                subtext: '',
              },
              text: '',
              showAddLinks: false,
            },
            topicImage: {
              path: 'https://statisk.ndla.no/historie/tankekart/den_franske_revolusjon/img/07_03_3g05913v_copy.jpg',
              mime: 'image/jpeg',
              copyright: {
                license: 'PD',
                title:
                  'Le peuple sous l&#039;ancien Regime (Menneskene under det gamle regimet)',
                author: 'Library of Congress',
                version: 'CC0 1.0',
              },
              width: 592,
              height: 392,
            },
            index: 2,
          },
          {
            id: '39a9ffb3-e2a6-47c3-9686-b089c90b9aa2',
            xPercentagePosition: 0,
            yPercentagePosition: 84.81072974653345,
            widthPercentage: 12.903225806451612,
            heightPercentage: 15.189270253466546,
            label: 'Borgerskapets fremvekst',
            description: '',
            dialog: {
              hasNote: true,
              audio: {},
              showAddLinks: false,
            },
            topicImage: {
              path: 'https://statisk.ndla.no/historie/tankekart/den_franske_revolusjon/img/07_05_szbadbb5.jpg',
              mime: 'image/jpeg',
              copyright: {
                license: 'U',
                title: 'Tredjestandens opprør',
                author: 'Akg-images, NTB Scanpix',
              },
              width: 596,
              height: 426,
            },
          },
          {
            id: '30088d75-76a2-4d41-bfa6-1e79356093e2',
            xPercentagePosition: 0,
            yPercentagePosition: 0,
            widthPercentage: 12.903225806451612,
            heightPercentage: 15.789473684210527,
            label: 'Opplysningstiden',
            description: '',
            dialog: {
              showAddLinks: false,
              hasNote: false,
              text: 'Opplysningstiden var en epoke i Europas intellektuelle historie der vitenskap, fornuft, frihet, toleranse og framskritt ble innsatt som nye idealer og autoriteter. Opplysningstenkerne argumenterte blant annet for ytringsfrihet, trykkefrihet, religionsfrihet, likhet for loven og demokrati. Det var også under opplysningstiden at begrepet om menneskerettigheter oppstod.',
            },
            index: 1,
          },
          {
            id: '8678616e-8293-4397-ad9a-a08e10019e1a',
            xPercentagePosition: 19.439321266968324,
            yPercentagePosition: 31.804023654950043,
            widthPercentage: 12.903225806451612,
            heightPercentage: 42.29282673000223,
            label: 'Stenderforsamlingen',
            description: '',
            dialog: {
              showAddLinks: false,
              hasNote: true,
              audio: {},
            },
            topicImage: {
              path: 'https://statisk.ndla.no/historie/tankekart/den_franske_revolusjon/img/07_06_estatesgeneral_1.jpg',
              mime: 'image/jpeg',
              copyright: {
                license: 'PD',
                title:
                  'Åpning av stenderforsamlingen i Versailles, 5. mai 1789',
                year: '1789',
                author: 'Charles Monnet, Isidore-Stanislaus Helman',
              },
              width: 580,
              height: 500,
            },
          },
          {
            id: '3548e78c-fc46-4226-9817-a61865b3baa8',
            xPercentagePosition: 38.87864253393665,
            yPercentagePosition: 0,
            widthPercentage: 19.537884250474388,
            heightPercentage: 100,
            label: 'Den franske revolusjon',
            description:
              'Den franske revolusjon var en periode med store sosiale og politiske omveltningene i Frankrike i perioden 1789–1799. Året 1789 markerer det første viktige vendepunktet under revolusjonen. 14. juli dette året brøt det ut masseopprør i Paris og fengselet Bastillen ble stormet. (Store norske leksikon)',
            dialog: {
              hasNote: true,
              maxLength: 300,
              audio: {
                audioFile: [
                  { path: 'https://bigsoundbank.com/UPLOAD/mp3/0001.mp3' },
                ],
                subtext: `
                  <b>
                    Den franske revolusjon var en periode med store sosiale og politiske
                    omveltningene i Frankrike i perioden 1789-1799. Året 1789 markerer det
                    første viktige vendepunktet under revolusjonen. 14. juli dette året brøt
                    det ut masseopprør i Paris og fengselet Bastillen ble stormet.
                  </b>
                  <br />
                  <p>
                    Perioden 1787-1789 kalles gjerne førrevolusjonen, men langsiktige
                    årsaker til revolusjonen strekker seg naturligvis mye lenger tilbake i
                    tid. De viktigste politiske, sosiale og administrative omveltninger
                    skjedde i perioden 1789-1794.
                  </p>
              `,
              },
              links: [
                {
                  id: 'link-1',
                  label: 'Årsaker til den franske revolusjonen',
                  url: 'https://ndla.no/subject:cc109c51-a083-413b-b497-7f80a0569a92/topic:ba59526d-02d1-4475-84d6-07fe1fb784df/topic:61047468-ae7d-4a2e-955e-49b20a47b275/resource:f27c22f9-2c4b-4239-a1a7-80ae3b62f531',
                },
                {
                  id: 'link-2',
                  label: 'Den franske revolusjon',
                  url: 'https://snl.no/Den_franske_revolusjon',
                },
              ],
              showAddLinks: true,
              video: [
                {
                  path: 'https://www.youtube.com/watch?v=zHvBPwNUBS8',
                  mime: 'video/YouTube',
                  copyright: { license: 'U' },
                },
              ],
              text: 'Perioden 1787–1789 kalles gjerne før-revolusjonen, men langsiktige årsaker til revolusjonen strekker seg naturligvis mye lenger tilbake i tid. De viktigste politiske, sosiale og administrative omveltninger skjedde i perioden 1789–1794. Deretter fulgte en periode hvor mange av de mest radikale tiltak fra tidligere ble moderert eller reversert, men hvor myndighetene mislyktes i å oppnå stabilitet og legitimitet. Med Napoleon Bonapartes statskupp i 1799 fikk Frankrike igjen et stabilt styre, til prisen av den politiske frihet.',
            },
            topicImage: {
              path: 'https://statisk.ndla.no/historie/tankekart/den_franske_revolusjon/img/01_08_ballhuseden.jpg',
              mime: 'image/jpeg',
              copyright: {
                license: 'PD',
                title: 'Ballhuseden',
                author: 'Jaques-Louis David',
              },
              width: 1024,
              height: 674,
            },
          },
          {
            id: '2b72c161-313e-414c-8829-0c72d6d50b6a',
            xPercentagePosition: 0,
            yPercentagePosition: 63.60804730990009,
            widthPercentage: 12.903225806451612,
            heightPercentage: 15.789473684210527,
            label: 'Uår i jordbruket',
            description: '',
            dialog: {
              hasNote: true,
              audio: {},
              showAddLinks: false,
            },
          },
          {
            id: '55881391-71bf-4c04-90d9-664f8e6bc4b8',
            xPercentagePosition: 84.23705882352941,
            yPercentagePosition: 15.902011827475022,
            widthPercentage: 9.677419354838719,
            heightPercentage: 15.789473684210527,
            label: 'Krig',
            description: '',
            dialog: {
              hasNote: true,
              audio: {},
              showAddLinks: false,
            },
            topicImage: {
              path: 'https://statisk.ndla.no/historie/tankekart/den_franske_revolusjon/img/07_11_Battle_of_Borodino.jpg',
              mime: 'image/jpeg',
              copyright: {
                license: 'PD',
                title: 'Slaget ved Borodino',
                author: 'Louis Lejeune',
              },
              width: 800,
              height: 470,
            },
          },
          {
            id: '70badd4b-72e0-4f21-b07e-1b5d9ebfba78',
            xPercentagePosition: 68.03762443438913,
            yPercentagePosition: 42.40536487326673,
            widthPercentage: 25.80645161290323,
            heightPercentage: 21.052631578947377,
            label: 'Napoleon',
            description: '',
            dialog: {
              hasNote: true,
              maxLength: 260,
              audio: {},
              showAddLinks: false,
            },
            topicImage: {
              path: 'https://statisk.ndla.no/historie/tankekart/den_franske_revolusjon/img/07_08_Napoleon_kopi.jpg',
              mime: 'image/jpeg',
              copyright: {
                license: 'PD',
                title: 'Napoleon krysser Sankt Bernhard',
                author: 'Jaques-Louis David',
              },
              width: 1012,
              height: 434,
            },
          },
          {
            id: 'f90f4f67-08ac-4aab-a93b-12d7862a996b',
            xPercentagePosition: 68.03762443438913,
            yPercentagePosition: 15.902011827475022,
            widthPercentage: 9.677419354838705,
            heightPercentage: 15.902011827475024,
            label: 'Reformer',
            description: '',
            dialog: {
              hasNote: true,
              audio: {},
              showAddLinks: true,
            },
            topicImage: {
              path: 'https://statisk.ndla.no/historie/tankekart/den_franske_revolusjon/img/07_09_szbd4871.jpg',
              mime: 'image/jpeg',
              copyright: {
                license: 'U',
                title: 'Code Civil des Francais',
                author: 'Akg-images, NTB Scanpix',
              },
              width: 512,
              height: 368,
            },
          },
          {
            id: 'f0e3e60c-8f60-4558-b474-1a2f682474d5',
            xPercentagePosition: 68.03762443438913,
            yPercentagePosition: 74.20938852821676,
            widthPercentage: 9.677419354838705,
            heightPercentage: 15.78947368421052,
            label: 'Terror og kaos',
            description: '',
            dialog: {
              hasNote: true,
              audio: {
                subtext: '',
              },
              text: '',
              showAddLinks: false,
            },
            topicImage: {
              path: 'https://statisk.ndla.no/historie/tankekart/den_franske_revolusjon/img/07_10_skisse_szbadf10.jpg',
              mime: 'image/jpeg',
              copyright: {
                license: 'U',
                title: 'Frakting av døde etter terroren',
                author: 'Etienne Bericourt, Akg-images, NTB-Scanpix',
              },
              width: 500,
              height: 366,
            },
          },
        ],
        arrowItems: [
          {
            id: 'ba4c7836-85e4-49a4-ad12-1805b12fb078',
            label: 'Opplysningstiden ⟶ Den franske revolusjon',
            description: '',
            startElementId: '30088d75-76a2-4d41-bfa6-1e79356093e2',
            endElementId: '3548e78c-fc46-4226-9817-a61865b3baa8',
            arrowType: ArrowType.Directional,
            startPosition: { x: 11.29032258064516, y: 7.894736842105263 },
            endPosition: { x: 36.29032258064516, y: 7.894736842105263 },
            dialog: {
              hasNote: true,
              maxLength: 300,
              showAddLinks: false,
              text: '',
            },
            breakpoints: [],
            relativeBreakpoints: [],
          },
          {
            id: 'cf1e08d7-5e29-46a9-a177-d96e5c23ee24',
            label: 'Den amerikanske revolusjonen ⟶ Den franske revolusjon',
            description: '',
            startElementId: '23bc191f-3b67-424b-aeee-b1706bd2b66f',
            endElementId: '3548e78c-fc46-4226-9817-a61865b3baa8',
            arrowType: ArrowType.Directional,
            startPosition: { x: 11.29032258064516, y: 23.684210526315788 },
            endPosition: { x: 36.29032258064516, y: 23.684210526315788 },
            breakpoints: [],
            relativeBreakpoints: [],
          },
          {
            id: '77a2c6a3-fba7-4a05-bf53-db10ce44d614',
            label: 'Stendersamfunnet ⟶ Stenderforsamlingen',
            description: '',
            startElementId: 'aa0ca5fc-237a-4237-9fd1-e8e8d4111254',
            endElementId: '8678616e-8293-4397-ad9a-a08e10019e1a',
            arrowType: ArrowType.Directional,
            startPosition: { x: 11.29032258064516, y: 50 },
            endPosition: { x: 16.93548387096774, y: 50 },
            breakpoints: [],
            relativeBreakpoints: [],
          },
          {
            id: '695a653c-e062-411f-a803-431d82933e40',
            label: 'Uår i jordbruket ⟶ Stenderforsamlingen',
            description: '',
            startElementId: '2b72c161-313e-414c-8829-0c72d6d50b6a',
            endElementId: '8678616e-8293-4397-ad9a-a08e10019e1a',
            arrowType: ArrowType.Directional,
            startPosition: { x: 11.29032258064516, y: 71.05263157894737 },
            endPosition: { x: 16.93548387096774, y: 71.05263157894737 },
            breakpoints: [],
            relativeBreakpoints: [],
          },
          {
            id: 'c0e6873a-d197-4114-af2d-72ca0fad1325',
            label: 'Borgerskapets fremvekst ⟶ Den franske revolusjon',
            description: '',
            startElementId: '39a9ffb3-e2a6-47c3-9686-b089c90b9aa2',
            endElementId: '3548e78c-fc46-4226-9817-a61865b3baa8',
            arrowType: ArrowType.Directional,
            startPosition: { x: 11.29032258064516, y: 92.10526315789474 },
            endPosition: { x: 36.29032258064516, y: 92.10526315789474 },
            breakpoints: [],
            relativeBreakpoints: [],
          },
          {
            id: '14fbc543-2589-416f-9c3f-52909f90247e',
            label: 'Stenderforsamlingen ⟶ Den franske revolusjon',
            description: '',
            startElementId: '8678616e-8293-4397-ad9a-a08e10019e1a',
            endElementId: '3548e78c-fc46-4226-9817-a61865b3baa8',
            arrowType: ArrowType.Directional,
            startPosition: { x: 30.64516129032258, y: 50 },
            endPosition: { x: 36.29032258064516, y: 50 },
            breakpoints: [],
            relativeBreakpoints: [],
          },
          {
            id: 'a723af57-0261-4244-b878-c001284e117f',
            label: 'Den franske revolusjon ⟶ Napoleon',
            description: '',
            startElementId: '3548e78c-fc46-4226-9817-a61865b3baa8',
            endElementId: '70badd4b-72e0-4f21-b07e-1b5d9ebfba78',
            arrowType: ArrowType.Directional,
            startPosition: { x: 56.451612903225815, y: 50 },
            endPosition: { x: 65.32258064516128, y: 50 },
            breakpoints: [],
            relativeBreakpoints: [],
          },
          {
            id: 'af83139b-d6c6-4624-82a7-516d4e4b705a',
            label: 'Napoleon ⟶ Reformer',
            description: '',
            startElementId: '70badd4b-72e0-4f21-b07e-1b5d9ebfba78',
            endElementId: 'f90f4f67-08ac-4aab-a93b-12d7862a996b',
            arrowType: ArrowType.Directional,
            startPosition: { x: 72.58064516129032, y: 44.73684210526316 },
            endPosition: { x: 72.58064516129032, y: 34.21052631578947 },
            breakpoints: [],
            relativeBreakpoints: [],
          },
          {
            id: '1bb64312-521c-4ba3-a65e-a6a1d7a346c6',
            label: 'Napoleon ⟶ Krig',
            description: '',
            startElementId: '70badd4b-72e0-4f21-b07e-1b5d9ebfba78',
            endElementId: '55881391-71bf-4c04-90d9-664f8e6bc4b8',
            arrowType: ArrowType.Directional,
            startPosition: { x: 88.70967741935483, y: 44.73684210526316 },
            endPosition: { x: 88.70967741935483, y: 34.21052631578947 },
            breakpoints: [],
            relativeBreakpoints: [],
          },
          {
            id: 'cf7d7b58-392d-4f7c-8d2d-718621f3b4f3',
            label: 'Terror og kaos ⟶ Napoleon',
            description: '',
            startElementId: 'f0e3e60c-8f60-4558-b474-1a2f682474d5',
            endElementId: '70badd4b-72e0-4f21-b07e-1b5d9ebfba78',
            arrowType: ArrowType.Directional,
            startPosition: { x: 72.58064516129032, y: 76.31578947368422 },
            endPosition: { x: 72.58064516129032, y: 65.78947368421053 },
            dialog: {
              hasNote: true,
              maxLength: 300,
              showAddLinks: false,
            },
            breakpoints: [],
            relativeBreakpoints: [],
          },
          {
            id: '9f694d81-7f0a-48a1-884b-e9cee9999879',
            label: 'Den amerikanske revolusjonen ⟶ Stenderforsamlingen',
            description: '',
            startElementId: '23bc191f-3b67-424b-aeee-b1706bd2b66f',
            endElementId: '8678616e-8293-4397-ad9a-a08e10019e1a',
            arrowType: ArrowType.Directional,
            startPosition: { x: 11.29032258064516, y: 34.21052631578947 },
            endPosition: { x: 16.93548387096774, y: 34.21052631578947 },
            breakpoints: [],
            relativeBreakpoints: [],
          },
        ],
        colorTheme: ColorTheme.Blue,
      },
    },
  },
};
