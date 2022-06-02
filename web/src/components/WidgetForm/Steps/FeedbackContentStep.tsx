import { FormEvent, useState } from "react"

import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"

import { ArrowLeft } from 'phosphor-react'
import { ScreenshotButton } from "../ScreenshotButton"

interface FeedbackContentStepProps {
  feedbackType: FeedbackType,
  onFeedbackRestartRequested: () => void,
  onFeedbackSent: () => void,
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {

  const [screenshot, setScreenshot] = useState<string | null>(null)

  const [comment, setComment] = useState<string>('')

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()

    console.log({screenshot, comment})

    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />

          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form 
        onSubmit={handleSubmitFeedback} 
        className="my-4 w-full"
      >
        <textarea
          className="textarea"
          placeholder={feedbackTypeInfo.placeholder}
          onChange={(event) => setComment(event.target.value)}
        />
 
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0}
            className="sendButton"
          >
            Send feedback
          </button>
        </footer>
      </form>
    </>
  )
}