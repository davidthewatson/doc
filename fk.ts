import axios from 'axios';
import { JSDOM } from 'jsdom';
import chalk from 'chalk';
import Table from 'cli-table3';

// Helper function to count syllables in a word
function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

// Compute Flesch-Kincaid metrics
function computeFleschKincaidMetrics(text: string) {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);

  const totalSentences = sentences.length;
  const totalWords = words.length;

  const readingEase =
    206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (syllables / totalWords);
  const gradeLevel =
    0.39 * (totalWords / totalSentences) + 11.8 * (syllables / totalWords) - 15.59;

  return { readingEase, gradeLevel };
}

const ranges = [
  { min: 90, max: 100, easeDescription: 'Very easy to read. Easily understood by an average 11-year-old student.', schoolLevel: '5th grade' },
  { min: 80, max: 89, easeDescription: 'Easy to read. Conversational English for consumers.', schoolLevel: '6th grade' },
  { min: 70, max: 79, easeDescription: 'Fairly easy to read.', schoolLevel: '7th grade' },
  { min: 60, max: 69, easeDescription: 'Plain English. Easily understood by 13- to 15-year-old students.', schoolLevel: '8th & 9th grade' },
  { min: 50, max: 59, easeDescription: 'Fairly difficult to read.', schoolLevel: '10th to 12th grade' },
  { min: 30, max: 49, easeDescription: 'Difficult to read.', schoolLevel: 'College' },
  { min: 0, max: 29, easeDescription: 'Very difficult to read. Best understood by university graduates.', schoolLevel: 'College graduate' },
];

function getRangeInfo(readingEase: number) {
  return ranges.find((range) => readingEase >= range.min && readingEase <= range.max);
}

async function fetchAndAnalyze(url: string) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const dom = new JSDOM(html);
    const bodyText = dom.window.document.body.textContent || '';

    const { readingEase, gradeLevel } = computeFleschKincaidMetrics(bodyText);
    const rangeInfo = getRangeInfo(readingEase);

    return {
      readingEase,
      gradeLevel,
      easeDescription: rangeInfo?.easeDescription || 'Unknown',
      schoolLevel: rangeInfo?.schoolLevel || 'Unknown',
    };
  } catch (error) {
    throw new Error(`Failed to fetch or analyze the URL: ${error.message}`);
  }
}

// CLI Interface
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error(chalk.red('Usage: bun fk.ts <url>'));
  process.exit(1);
}

const url = args[0];

fetchAndAnalyze(url)
  .then((result) => {
    const table = new Table({
      style: { head: [], border: [] },
      colWidths: [20, 60],
    });

    // table.push(
    //   [chalk.blueBright('Reading Ease'), chalk.green(result.readingEase.toFixed(2))],
    //   [chalk.blueBright('Ease Description'), chalk.yellow(result.easeDescription)],
    //   [chalk.blueBright('Grade Level'), chalk.green(result.gradeLevel.toFixed(2))],
    //   [chalk.blueBright('Level Description'), chalk.magenta(result.schoolLevel)]
    // );

    table.push(
      [chalk.blueBright('Reading Ease'), 
        chalk.blueBright('Ease Description'), 
        chalk.blueBright('Grade Level'), 
        chalk.blueBright('Level Description')],
       [chalk.green(result.readingEase.toFixed(2)),
        chalk.yellow(result.easeDescription),
        chalk.green(result.gradeLevel.toFixed(2)),
        chalk.magenta(result.schoolLevel)]  
    );
    console.log(table.toString());
  })
  .catch((error) => {
    console.error(chalk.red(`Error: ${error.message}`));
  });
