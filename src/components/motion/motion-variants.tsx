import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const slideIn = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 }
}

// Motion components
export const MotionMain = motion.main
export const MotionDiv = motion.div
export const MotionSection = motion.section

// Transition configurations
export const defaultTransition = {
  duration: 0.5,
  ease: "easeInOut"
}

export const staggeredTransition = {
  duration: 0.3,
  staggerChildren: 0.1
}

// Reusable motion components
interface MotionProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
}

export const AnimatedMain = ({ children, delay = 0, ...props }: MotionProps) => (
  <motion.main
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    transition={{ ...defaultTransition, delay }}
    {...props}
  >
    {children}
  </motion.main>
)

export const AnimatedDiv = ({ children, delay = 0, ...props }: MotionProps) => (
  <motion.div
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    transition={{ ...defaultTransition, delay }}
    {...props}
  >
    {children}
  </motion.div>
)

export const AnimatedSection = ({ children, delay = 0, ...props }: MotionProps) => (
  <motion.section
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    transition={{ ...defaultTransition, delay }}
    {...props}
  >
    {children}
  </motion.section>
)

export const AnimatedSlide = ({ children, ...props }: MotionProps) => (
  <motion.div
    variants={slideIn}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={defaultTransition}
    {...props}
  >
    {children}
  </motion.div>
)

interface StaggeredProps extends MotionProps {
  index?: number
}

export const AnimatedStaggered = ({ children, index = 0, ...props }: StaggeredProps) => (
  <motion.div
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ ...staggeredTransition, delay: index * 0.1 }}
    {...props}
  >
    {children}
  </motion.div>
) 