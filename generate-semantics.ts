import * as fs from "fs";
import { semantics } from "./src/semantics";

const semanticsPath = "semantics.json";
const translationKeyPath = "src/types/TranslationKey.ts";

async function createSemanticsJson(): Promise<void> {
  const textContent = JSON.stringify(semantics, null, 2);
  await fs.promises.writeFile(semanticsPath, textContent);
}

async function createTranslationKeys(): Promise<void> {
  const translationKeys = semantics[2].fields.map(({ name }) => name);

  const textContent = `export type TranslationKey = \n | "${translationKeys.join(
    '"\n  | "',
  )}";\n`;
  await fs.promises.writeFile(translationKeyPath, textContent);
}

async function run(): Promise<void> {
  await createSemanticsJson();
  await createTranslationKeys();
}

run();
