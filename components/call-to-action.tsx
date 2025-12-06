
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Boxes } from '@/components/ui/background-boxes';
import { useState } from 'react';
import { toast } from 'sonner';

type UserType = 'developer' | 'institution';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70, 
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (userType: UserType) => {
    if (!email) {
      toast.error('Please enter a valid email.');
      return;
    }

    setIsSubmitting(true);
    
    const portalId = "244447423";
    const formId = userType === 'developer' 
      ? "50cf131a-94cc-4607-9cfb-0d12dbdf6a89" 
      : "0b71f76b-4670-4656-afd3-fdff94156d7a";
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    // Get hubspot cookie (if present)
    const hutk = document.cookie
      .split("; ")
      .find(row => row.startsWith("hubspotutk="))
      ?.split("=")[1];

    // Build the context object dynamically
    const context: Record<string, string> = {
      pageUri: window.location.href,
      pageName: document.title
    };

    if (hutk) {
      context.hutk = hutk;
    }

    const payload = {
      fields: [
        { name: "email", value: email }
      ],
      context: context
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success("You're in! Check your inbox.");
        setEmail('');
        setIsSuccess(true);
        handleConfetti();
      } else {
        const errorText = await res.text();
        console.error("HubSpot error", errorText);
        toast.error("Something went wrong. Try again.");
      }
    } catch (err) {
      toast.error("Network error. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="call-to-action" className="h-96 relative w-full overflow-hidden bg-zinc-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-zinc-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
       <Boxes />
       
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white/80 font-semibold text-sm uppercase tracking-wide mb-6"
          >
            Ready to get started?
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-10"
          >
            Join the beta today
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 max-w-lg mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              required
            />
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                type="button" 
                variant="outline" 
                size="lg" 
                className="font-semibold whitespace-nowrap"
                disabled={isSubmitting}
                onClick={() => handleSubmit('developer')}
              >
                {isSubmitting ? 'Signing up...' : 'I want to access data'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="lg" 
                className="font-semibold whitespace-nowrap"
                disabled={isSubmitting}
                onClick={() => handleSubmit('institution')}
              >
                {isSubmitting ? 'Signing up...' : 'I want to provide data'}
              </Button>
            </div>
          </motion.div>
          
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg max-w-md mx-auto"
            >
              <p className="text-green-400 font-medium">
                🎉 You're in! Check your inbox for beta access details.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
