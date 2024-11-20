use anchor_lang::prelude::*;

declare_id!("5TtSuWwcCr5ww4Kef2aYsvT8uF9H1hHGyC7fhsCwAaUx");

#[program]
pub mod crappier_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
