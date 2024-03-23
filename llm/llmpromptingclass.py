from torch import cuda
import transformers
import time

def convert_seconds(seconds):
    hours = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60
    return hours, minutes, seconds


class LLMPrompter:

    model_id = 'meta-llama/Llama-2-7b-hf'
    device = f'cuda:{cuda.current_device()}' if cuda.is_available() else 'cpu'

    # Llama 2 Tokenizer
    tokenizer = transformers.AutoTokenizer.from_pretrained(model_id)

    # Llama 2 Model
    model = transformers.AutoModelForCausalLM.from_pretrained(
        model_id,
        trust_remote_code=True,
        device_map='auto'
    )

    # Pipeline using Transformers
    generator = transformers.pipeline(
        model=model, tokenizer=tokenizer,
        task='text-generation',
        temperature=0.1,
        max_new_tokens=1000,
        repetition_penalty=1.1
    )

    def __init__(self, task: str, num_steps: int, length: str, hours_per_day: int):

        self.task = task
        self.steps = num_steps
        self.length = length
        self.hours_per_day = hours_per_day

        # Preliminary context given to Llama2
        system_prompt = """
        <s>[INST] <<SYS>>
        You are a helpful, respectful and honest secretary for efficiently creating detailed schedules given
        specific criteria that you will strictly follow.
        <</SYS>>
        """

        # Example prompt and response to model ideal response
        example_prompt = """
        Given a large task, break this task down into 15 step-by-step smaller tasks that are more manageable. Your response should be in a numbered format, where each number lists the name of each smaller task, 
        describes the smaller task and includes the time it would take to complete the respective smaller task. Limit each smaller task to take a maximum of 8 hours time to complete, no more.
        For each smaller task, provide a short description of the smaller task to complete and the approximate time it'd take to complete the smaller task.

        Here is your large task to break down: Assemble a fully functioning gaming desktop given the necessary parts

        Based on the large task provided above, please create a set of numbered smaller sub-tasks, with the short description and approximate time it takes to complete each sub-task in parentheses.
        Make sure you to only return the list of smaller tasks, short descriptions, times, and nothing more.
        
        [/INST] 1. Research and select the appropriate components for the gaming desktop (time: 2 hours)
                * Identify the type of games you want to play on the desktop
                * Determine the required hardware specifications for these games
                * Compare prices of different components to find the best deals
                * Create a list of recommended components
        2. Purchase all necessary components (time: 4 hours)
                * Visit online retailers or physical stores to purchase the selected components
                * Ensure that all components are compatible with each other
                * Verify the availability of components before making a purchase
        3. Install the operating system and necessary software (time: 6 hours)
                * Download and install the operating system (Windows or macOS)
                * Install necessary drivers for the hardware components
                * Install games and other software as needed
        4. Configure and optimize the desktop for optimal performance (time: 8 hours)
                * Adjust settings in the operating system and applications to improve performance
                * Update the BIOS settings for optimal performance
                * Run benchmarking tests to identify areas for improvement
        5. Test and troubleshoot the desktop (time: 4 hours)
                * Play games and run applications to test the desktop's performance
                * Identify any issues or errors and troubleshoot them
                * Make sure the desktop is functioning properly and meets your expectations
        6. Assemble the desktop (time: 2 hours)
                * Follow the manufacturer's instructions to assemble the desktop
                * Connect all hardware components and ensure they are securely connected
                * Test the desktop to ensure it is functioning properly
        7. Finalize the desktop by adding any finishing touches (time: 1 hour)
                * Add decorative elements such as stickers or lighting
                * Connect any additional peripherals such as a keyboard or mouse
                * Test the desktop one last time to ensure everything is working properly
        Total time: 25 hours
        """

        # Main prompt to generate response off of
        main_prompt = f"""
        [INST]
        Given a large task, break this task down into {num_steps} step-by-step smaller tasks that are more manageable. Your response should be in a numbered format, where each number lists the name of each smaller task, 
        describes the smaller task and includes the time it would take to complete the respective smaller task. Limit each smaller task to take a maximum of {hours_per_day} hours time to complete, no more.
        For each smaller task, provide a short description of the smaller task to complete and the approximate time it'd take to complete the smaller task.

        Here is your large task to break down: {task} in {length}

        Based on the large task provided above, please create a set of numbered smaller sub-tasks, with the short description and approximate time it takes to complete each sub-task in parentheses.
        Make sure you to only return the list of smaller tasks, short descriptions, times, and nothing more.
        
        [/INST]
        """

        self.prompt = system_prompt + example_prompt + main_prompt




    def generate_subtasks(self):
        # Record start time
        start_time = time.time()

        res = self.generator(self.prompt)

        # Record end time
        end_time = time.time()

        hours, minutes, seconds = convert_seconds(end_time - start_time)
        print(f"Elapsed time to generate response: {hours} hours, {minutes} minutes, and {seconds} seconds")

        response = ""
        if self.prompt in res[0]["generated_text"]:
            response = res[0]["generated_text"].replace(self.prompt, "")

        return response
    

if __name__ == "__main__":
    prompt1 = LLMPrompter("Learn how to play the flute", 20, "one month", 2)

    response1 = prompt1.generate_subtasks()

    print(prompt1.task, ": ", response1)
    