import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const commands = [
  '$ meshub config set ApiKey **********',
  '$ meshub justice describe-crimes --country usa',
  '$ meshub government describe-laws --law-id 123-456 --country usa',
  '$ meshub business describe-companies --name smart-llc --country usa'
];

const responses = [
  '✓ API Key set',
  '✓ { "id": "123-456", "type": "Burglary", "date": "2024-11-15", "location": "Boston, MA", ... }',
  '✓ { "id": "123-456", "title": "Fair Labor Act", "jurisdiction": "Federal", ... }',
  '✓ { "id": "123-456", "name": "Smart LLC", "state": "Delaware", ... }'
];

const TerminalAnimation = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete || currentLine >= commands.length) return;

    const currentCommand = commands[currentLine];
    
    if (isTypingCommand && currentChar < currentCommand.length) {
      // Type the command character by character with variable speed for realism
      const timer = setTimeout(() => {
        setDisplayedText(prev => {
          const newText = [...prev];
          const lineIndex = currentLine * 2; // Each command takes 2 lines (command + response)
          newText[lineIndex] = currentCommand.slice(0, currentChar + 1);
          return newText;
        });
        setCurrentChar(prev => prev + 1);
      }, 40 + Math.random() * 80); // Random delay between 40-120ms for realistic typing
      return () => clearTimeout(timer);
    } else if (isTypingCommand && currentChar >= currentCommand.length) {
      // Command finished typing, now add the response
      const timer = setTimeout(() => {
        setDisplayedText(prev => {
          const newText = [...prev];
          const responseIndex = currentLine * 2 + 1;
          newText[responseIndex] = responses[currentLine];
          return newText;
        });
        setIsTypingCommand(false);
        setCurrentChar(0);
      }, 600);
      return () => clearTimeout(timer);
    } else if (!isTypingCommand) {
      // Response added, move to next command
      const timer = setTimeout(() => {
        if (currentLine + 1 >= commands.length) {
          // All commands complete, mark as done
          setIsComplete(true);
        } else {
          setCurrentLine(prev => prev + 1);
          setIsTypingCommand(true);
        }
      }, 960);
      return () => clearTimeout(timer);
    }
  }, [currentChar, currentLine, isTypingCommand]);

  // Wait 3 seconds after completion before resetting
  useEffect(() => {
    if (isComplete) {
      const resetTimer = setTimeout(() => {
        setCurrentLine(0);
        setCurrentChar(0);
        setDisplayedText([]);
        setIsTypingCommand(true);
        setIsComplete(false);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [isComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="relative max-w-4xl mx-auto"
    >
      <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-400 text-sm ml-4">meshub-terminal</div>
        </div>
        
        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm min-h-[300px] text-left">
          {displayedText.map((line, index) => (
            <div key={index} className="mb-2">
              {line && line.startsWith('$') ? (
                <div className="text-green-400">
                  <span className="text-blue-400">user@host</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-white">{line}</span>
                  {/* Show cursor at end of current typing line */}
                  {index === currentLine * 2 && isTypingCommand && currentLine < commands.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-green-400 text-lg"
                    >
                      █
                    </motion.span>
                  )}
                </div>
              ) : line ? (
                <div className="text-green-400 ml-4">{line}</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalAnimation;
