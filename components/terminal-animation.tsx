import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalAnimation = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);

  const commands = [
    '$ curl -X GET "https://api.meshub.us/v1/justice/cases"',
    '$ meshub query --dataset demographics --filter "age>25"',
    '$ meshub analyze --type legislation --country US',
    '$ meshub export --format json --output results.json'
  ];

  const responses = [
    '✓ Connected to Meshub API',
    '✓ Query executed successfully',
    '✓ Analysis complete - 1,247 records found',
    '✓ Data exported to results.json'
  ];

  useEffect(() => {
    if (currentLine >= commands.length) return;

    const currentCommand = commands[currentLine];
    
    if (currentChar < currentCommand.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => {
          const newText = [...prev];
          if (!newText[currentLine]) newText[currentLine] = '';
          newText[currentLine] = currentCommand.slice(0, currentChar + 1);
          return newText;
        });
        setCurrentChar(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Add response after command is complete
      const timer = setTimeout(() => {
        setDisplayedText(prev => [...prev, responses[currentLine]]);
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentChar, currentLine]);

  // Reset animation every 15 seconds
  useEffect(() => {
    const resetTimer = setInterval(() => {
      setCurrentLine(0);
      setCurrentChar(0);
      setDisplayedText([]);
    }, 15000);
    return () => clearInterval(resetTimer);
  }, []);

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
        <div className="p-6 font-mono text-sm min-h-[300px]">
          {displayedText.map((line, index) => (
            <div key={index} className="mb-2">
              {line.startsWith('$') ? (
                <div className="text-green-400">
                  <span className="text-blue-400">user@meshub</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-white">{line}</span>
                  {/* Show cursor at end of current typing line */}
                  {index === currentLine && currentLine < commands.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-green-400 text-lg"
                    >
                      █
                    </motion.span>
                  )}
                </div>
              ) : (
                <div className="text-gray-300 ml-4">{line}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalAnimation;